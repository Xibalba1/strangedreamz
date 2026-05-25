import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import type { FastifyServerOptions } from "fastify";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { scaffoldStatus as defaultScaffoldStatus } from "../shared/scaffold";

type CreateAppOptions = {
  logger?: FastifyServerOptions["logger"];
  releaseSha?: string;
  serveStatic?: boolean;
  scaffoldStatus?: string;
  staticRoot?: string;
};

export const createApp = (options: CreateAppOptions = {}) => {
  const app = Fastify({ logger: options.logger ?? true });
  const status = options.scaffoldStatus ?? defaultScaffoldStatus;
  const releaseSha = options.releaseSha ?? process.env.RELEASE_SHA ?? "local";

  app.get("/healthz", async () => ({
    ok: true,
    service: "strangedreamz",
    status,
    release: {
      sha: releaseSha,
    },
  }));

  if (options.serveStatic && options.staticRoot) {
    const staticRoot = options.staticRoot;

    void app.register(fastifyStatic, {
      root: staticRoot,
      index: "index.html",
      wildcard: false,
    });

    app.get("/display", async (_request, reply) => {
      const indexHtml = await readFile(join(staticRoot, "index.html"), "utf8");

      return reply.type("text/html; charset=utf-8").send(indexHtml);
    });
  }

  return app;
};
