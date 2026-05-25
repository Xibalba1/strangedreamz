import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import type { FastifyReply, FastifyServerOptions } from "fastify";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { scaffoldStatus as defaultScaffoldStatus } from "../shared/scaffold";
import { createRoomStore, type RoomStore } from "./roomStore";

type CreateAppOptions = {
  logger?: FastifyServerOptions["logger"];
  releaseSha?: string;
  serveStatic?: boolean;
  scaffoldStatus?: string;
  staticRoot?: string;
  roomStore?: RoomStore;
};

type SessionBody = {
  sessionId?: string;
};

type ClaimHandleBody = SessionBody & {
  handle?: string;
};

type SubmitThemeBody = SessionBody & {
  theme?: string;
};

const sendMutationError = (reply: FastifyReply, error: unknown) =>
  reply.code(400).send({
    error: error instanceof Error ? error.message : "Action failed.",
  });

export const createApp = (options: CreateAppOptions = {}) => {
  const app = Fastify({ logger: options.logger ?? true });
  const status = options.scaffoldStatus ?? defaultScaffoldStatus;
  const releaseSha = options.releaseSha ?? process.env.RELEASE_SHA ?? "local";
  const roomStore = options.roomStore ?? createRoomStore();

  app.get("/healthz", async () => ({
    ok: true,
    service: "strangedreamz",
    status,
    release: {
      sha: releaseSha,
    },
  }));

  app.get<{ Querystring: SessionBody }>("/api/room", async (request) =>
    roomStore.snapshot(request.query.sessionId),
  );

  app.post<{ Body: ClaimHandleBody }>("/api/handles", async (request, reply) => {
    try {
      return roomStore.claimHandle(request.body.sessionId ?? "", request.body.handle ?? "");
    } catch (error) {
      return sendMutationError(reply, error);
    }
  });

  app.post<{ Body: SubmitThemeBody }>("/api/themes", async (request, reply) => {
    try {
      return roomStore.submitTheme(request.body.sessionId ?? "", request.body.theme ?? "");
    } catch (error) {
      return sendMutationError(reply, error);
    }
  });

  app.post<{ Body: SessionBody; Params: { themeId: string } }>(
    "/api/themes/:themeId/boosts",
    async (request, reply) => {
      try {
        return roomStore.boostTheme(request.body.sessionId ?? "", request.params.themeId);
      } catch (error) {
        return sendMutationError(reply, error);
      }
    },
  );

  app.post<{ Body: SessionBody; Params: { paneId: string } }>(
    "/api/panes/:paneId/votes",
    async (request, reply) => {
      try {
        return roomStore.votePane(request.body.sessionId ?? "", request.params.paneId);
      } catch (error) {
        return sendMutationError(reply, error);
      }
    },
  );

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
