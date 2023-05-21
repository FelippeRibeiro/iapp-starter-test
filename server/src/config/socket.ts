import { Server as SocketIOServer } from "socket.io";
import http from "http";

let conections: any[] = [];
export function initializeSocket(server: http.Server) {
  const io = new SocketIOServer(server);

  io.on("connection", (client) => {
    console.log("New Connection!", client.id);

    client.on("disconnect", () => {
      console.log("User disconnected!");
      conections = conections.filter((c) => c.id !== client.id);
      io.emit(
        "refreshConnection",
        conections.map((c) => c.id)
      );
    });

    conections.push(client);

    io.emit(
      "refreshConnection",
      conections.map((c) => c.id)
    );

    client.on("message", (message: { from: string; to: string; message: string }) => {
      console.log(
        `Enivando mensagem direta de: ${message.from} para ${message.to} mensagem: ${message.message}`
      );
      conections.forEach((c) => {
        if (c.id === message.to) {
          c.emit("direct", { from: message.from, message: message.message });
        }
      });
    });
  });
}
