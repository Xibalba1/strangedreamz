import Fastify from "fastify";
import { Server } from "socket.io";
import { scaffoldStatus } from "../shared/scaffold";

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

const fastify = Fastify({ logger: true });

fastify.get("/healthz", async () => ({
  ok: true,
  service: "strangedreamz",
  status: scaffoldStatus,
}));

const start = async () => {
  await fastify.listen({ port, host });

  const io = new Server(fastify.server, {
    cors: {
      origin: true,
    },
  });

  io.on("connection", (socket) => {
    socket.join("canonical-room");
    socket.emit("scaffold:ready", { status: scaffoldStatus });
  });
};

void start();
