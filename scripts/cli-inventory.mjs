import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export const CLI_INVENTORY = [
  {
    id: "git",
    label: "git",
    category: "source-control",
    command: "git",
    args: ["--version"],
    required: true,
    agentUse: "Inspect branches, diffs, commits, remotes, and local repo state before acting.",
    docs: "AGENTS.md",
  },
  {
    id: "gh",
    label: "GitHub CLI",
    category: "source-control",
    command: "gh",
    args: ["--version"],
    required: true,
    agentUse: "Inspect PRs, checks, CI runs, review state, and publish branches when GitHub work is needed.",
    docs: "docs/agent-skills/review.md",
  },
  {
    id: "hcloud",
    label: "Hetzner Cloud CLI",
    category: "infrastructure",
    command: "hcloud",
    args: ["version"],
    required: true,
    followUp: {
      label: "active context",
      command: "hcloud",
      args: ["context", "active"],
    },
    agentUse: "Inspect and manage Hetzner Cloud resources for the strangedreamz project.",
    docs: "docs/operations/deployment-runbook.md",
  },
  {
    id: "docker",
    label: "Docker",
    category: "runtime",
    command: "docker",
    args: ["--version"],
    required: true,
    agentUse: "Build and verify production-style images locally before deployment.",
    docs: "Dockerfile",
  },
  {
    id: "docker-compose",
    label: "Docker Compose",
    category: "runtime",
    command: "docker",
    args: ["compose", "version"],
    required: true,
    agentUse: "Run and inspect the production compose stack locally or on the VPS.",
    docs: "deploy/compose.yaml",
  },
  {
    id: "ssh",
    label: "OpenSSH",
    category: "infrastructure",
    command: "ssh",
    args: ["-V"],
    required: true,
    agentUse: "Access the Hetzner VPS using the documented deployment key when release work requires it.",
    docs: "docs/operations/deployment-runbook.md",
  },
  {
    id: "curl",
    label: "curl",
    category: "network",
    command: "curl",
    args: ["--version"],
    required: true,
    agentUse: "Probe HTTP endpoints, API responses, and smoke-check details from the shell.",
    docs: "docs/operations/release-identity-and-smoke-checks.md",
  },
  {
    id: "node",
    label: "Node.js",
    category: "runtime",
    command: "node",
    args: ["--version"],
    required: true,
    minimumVersion: "22.22.3",
    agentUse: "Run local scripts and the TypeScript/Vite toolchain using the version from .nvmrc.",
    docs: ".nvmrc",
  },
  {
    id: "npm",
    label: "npm",
    category: "runtime",
    command: "npm",
    args: ["--version"],
    required: true,
    minimumVersion: "10.9.8",
    agentUse: "Run canonical validation, smoke checks, and project scripts.",
    docs: "package.json",
  },
];

const SECRET_PATTERNS = [
  /\b([A-Z0-9_]*(?:TOKEN|SECRET|PASSWORD|KEY)[A-Z0-9_]*=)([^\s]+)/gi,
  /\b(Bearer\s+)([A-Za-z0-9._~+/=-]+)/gi,
];

export function redactSensitiveOutput(output) {
  return SECRET_PATTERNS.reduce(
    (current, pattern) => current.replace(pattern, "$1[redacted]"),
    output,
  );
}

function normalizeOutput(stdout = "", stderr = "") {
  const combined = `${stdout}\n${stderr}`.trim();
  return redactSensitiveOutput(combined).split("\n").at(0)?.trim() ?? "";
}

function coerceVersion(output) {
  const match = output.match(/\d+\.\d+\.\d+/);
  return match?.[0];
}

function compareVersions(actual, expected) {
  const actualParts = actual.split(".").map(Number);
  const expectedParts = expected.split(".").map(Number);

  for (let index = 0; index < expectedParts.length; index += 1) {
    const actualPart = actualParts[index] ?? 0;
    const expectedPart = expectedParts[index] ?? 0;

    if (actualPart > expectedPart) {
      return 1;
    }

    if (actualPart < expectedPart) {
      return -1;
    }
  }

  return 0;
}

function versionStatus(entry, primary) {
  if (!primary.ok || !entry.minimumVersion) {
    return primary.ok ? "available" : primary.missing ? "missing" : "check-failed";
  }

  const actualVersion = coerceVersion(primary.output);

  if (!actualVersion) {
    return "check-failed";
  }

  return compareVersions(actualVersion, entry.minimumVersion) >= 0
    ? "available"
    : "version-mismatch";
}

export async function runCliCommand(command, args) {
  try {
    const { stdout, stderr } = await execFileAsync(command, args, {
      timeout: 5000,
      maxBuffer: 1024 * 128,
    });

    return {
      ok: true,
      output: normalizeOutput(stdout, stderr),
    };
  } catch (error) {
    const missing = error?.code === "ENOENT";
    const output = normalizeOutput(error?.stdout, error?.stderr);

    return {
      ok: false,
      missing,
      output: output || (missing ? "command not found" : error?.message ?? "command failed"),
    };
  }
}

async function buildRow(entry, runCommand) {
  const primary = await runCommand(entry.command, entry.args);
  const followUp =
    primary.ok && entry.followUp
      ? await runCommand(entry.followUp.command, entry.followUp.args)
      : undefined;
  const followUpDetail =
    followUp?.ok && followUp.output
      ? `${entry.followUp.label}: ${followUp.output}`
      : undefined;

  return {
    id: entry.id,
    label: entry.label,
    category: entry.category,
    required: entry.required,
    status: versionStatus(entry, primary),
    detail: [
      entry.minimumVersion &&
      primary.ok &&
      compareVersions(coerceVersion(primary.output) ?? "0.0.0", entry.minimumVersion) < 0
        ? `${primary.output} (requires >= ${entry.minimumVersion})`
        : primary.output,
      followUpDetail,
    ]
      .filter(Boolean)
      .join(" | "),
    agentUse: entry.agentUse,
    docs: entry.docs,
  };
}

export async function buildInventoryReport({
  inventory = CLI_INVENTORY,
  runCommand = runCliCommand,
} = {}) {
  const rows = [];

  for (const entry of inventory) {
    rows.push(await buildRow(entry, runCommand));
  }

  return {
    generatedAt: new Date().toISOString(),
    rows,
  };
}

export function formatMarkdownReport(report) {
  const lines = [
    "# CLI Inventory Check",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    "| Tool | Category | Status | Detail | Agent use | Docs |",
    "| --- | --- | --- | --- | --- | --- |",
  ];

  for (const row of report.rows) {
    lines.push(
      [
        row.label,
        row.category,
        row.status,
        row.detail || "no output",
        row.agentUse,
        row.docs,
      ]
        .map((value) => String(value).replaceAll("|", "\\|"))
        .join(" | ")
        .replace(/^/, "| ")
        .replace(/$/, " |"),
    );
  }

  return `${lines.join("\n")}\n`;
}

function shouldPrintJson() {
  return process.argv.includes("--json");
}

function shouldUseStrictExit() {
  return process.argv.includes("--strict");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const report = await buildInventoryReport();

  if (shouldPrintJson()) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(formatMarkdownReport(report));
  }

  if (
    shouldUseStrictExit() &&
    report.rows.some((row) => row.required && row.status !== "available")
  ) {
    process.exit(1);
  }
}
