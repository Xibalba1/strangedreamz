import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import type { FastifyServerOptions } from "fastify";
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
    void app.register(fastifyStatic, {
      root: options.staticRoot,
      index: "index.html",
      wildcard: false,
    });
  }

  return app;
};
