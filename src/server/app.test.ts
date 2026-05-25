import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createApp } from "./app";
import type { FastifyInstance } from "fastify";

describe("server app", () => {
  let app: FastifyInstance | undefined;
  let staticRoot: string | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
    if (staticRoot) {
      await rm(staticRoot, { force: true, recursive: true });
      staticRoot = undefined;
    }
  });

  it("reports release identity through the health endpoint", async () => {
    app = createApp({
      logger: false,
      releaseSha: "test-release-sha",
      scaffoldStatus: "test scaffold status",
    });

    const response = await app.inject("/healthz");

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      ok: true,
      service: "strangedreamz",
      status: "test scaffold status",
      release: {
        sha: "test-release-sha",
      },
    });
  });

  it("serves the client shell for display mode in production static mode", async () => {
    staticRoot = await mkdtemp(join(tmpdir(), "strangedreamz-static-"));
    await writeFile(
      join(staticRoot, "index.html"),
      "<!doctype html><main>Strange Dreamz shell</main>",
    );
    app = createApp({
      logger: false,
      serveStatic: true,
      staticRoot,
    });

    const response = await app.inject("/display");

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.body).toContain("Strange Dreamz shell");
  });
});
