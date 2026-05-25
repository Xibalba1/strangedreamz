import { afterEach, describe, expect, it } from "vitest";
import { createApp } from "./app";
import type { FastifyInstance } from "fastify";

describe("server app", () => {
  let app: FastifyInstance | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
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
});
