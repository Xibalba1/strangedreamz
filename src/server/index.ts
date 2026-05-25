import { Server } from "socket.io";
import { createApp } from "./app";
import { scaffoldStatus } from "../shared/scaffold";
import path from "node:path";

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

const app = createApp({
  serveStatic: process.env.SERVE_STATIC === "true",
  staticRoot: process.env.STATIC_ROOT ?? path.resolve(process.cwd(), "dist"),
});

const start = async () => {
  await app.listen({ port, host });

  const io = new Server(app.server, {
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
