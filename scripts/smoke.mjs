const args = process.argv.slice(2);

const readOption = (name) => {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
};

const url = readOption("--url");
const expectedSha = readOption("--expected-sha");

if (!url || !expectedSha) {
  console.error("Usage: npm run smoke -- --url <base-url> --expected-sha <sha>");
  process.exit(2);
}

const baseUrl = url.replace(/\/$/, "");

const fail = (message) => {
  console.error(`Smoke failed: ${message}`);
  process.exit(1);
};

const healthResponse = await fetch(`${baseUrl}/healthz`);
if (!healthResponse.ok) {
  fail(`/healthz returned ${healthResponse.status}`);
}

const health = await healthResponse.json();
if (health?.ok !== true) {
  fail("/healthz did not report ok=true");
}

if (health?.service !== "strangedreamz") {
  fail(`/healthz reported unexpected service ${JSON.stringify(health?.service)}`);
}

if (health?.release?.sha !== expectedSha) {
  fail(
    `/healthz release sha ${JSON.stringify(
      health?.release?.sha,
    )} did not match expected ${JSON.stringify(expectedSha)}`,
  );
}

const rootResponse = await fetch(baseUrl);
if (!rootResponse.ok) {
  fail(`/ returned ${rootResponse.status}`);
}

const rootBody = await rootResponse.text();
if (!rootBody.includes("Strange Dreamz")) {
  fail("/ did not include the app shell");
}

console.log(`Smoke passed for ${baseUrl} at ${expectedSha}`);
