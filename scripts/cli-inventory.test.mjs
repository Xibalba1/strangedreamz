import { describe, expect, it } from "vitest";

import {
  CLI_INVENTORY,
  buildInventoryReport,
  formatMarkdownReport,
  redactSensitiveOutput,
} from "./cli-inventory.mjs";

describe("CLI inventory", () => {
  it("tracks the project-critical CLIs agents should prefer", () => {
    const ids = CLI_INVENTORY.map((entry) => entry.id);

    expect(ids).toEqual(
      expect.arrayContaining([
        "git",
        "gh",
        "hcloud",
        "docker",
        "docker-compose",
        "ssh",
        "curl",
        "node",
        "npm",
      ]),
    );
  });

  it("builds an agent-ready report without invoking real CLIs in tests", async () => {
    const report = await buildInventoryReport({
      inventory: [
        {
          id: "example-cli",
          label: "example",
          category: "example",
          command: "example",
          args: ["--version"],
          agentUse: "Use for examples.",
          docs: "docs/example.md",
        },
      ],
      runCommand: async () => ({
        ok: true,
        output: "example 1.2.3",
      }),
    });

    expect(report.rows).toEqual([
      expect.objectContaining({
        id: "example-cli",
        label: "example",
        status: "available",
        detail: "example 1.2.3",
      }),
    ]);
    expect(formatMarkdownReport(report)).toContain("Use for examples.");
  });

  it("flags tools that are installed below their required version", async () => {
    const report = await buildInventoryReport({
      inventory: [
        {
          id: "example-cli",
          label: "example",
          category: "example",
          command: "example",
          args: ["--version"],
          minimumVersion: "2.0.0",
          agentUse: "Use for examples.",
          docs: "docs/example.md",
        },
      ],
      runCommand: async () => ({
        ok: true,
        output: "example 1.2.3",
      }),
    });

    expect(report.rows[0]).toEqual(
      expect.objectContaining({
        status: "version-mismatch",
        detail: "example 1.2.3 (requires >= 2.0.0)",
      }),
    );
  });

  it("redacts suspicious secret-looking output before display", () => {
    expect(
      redactSensitiveOutput(
        "HCLOUD_TOKEN=super-secret-value Authorization: Bearer abc123",
      ),
    ).toBe("HCLOUD_TOKEN=[redacted] Authorization: Bearer [redacted]");
  });
});
