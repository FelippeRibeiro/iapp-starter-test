import { Socket, Server as SocketIOServer } from "socket.io";
import http from "http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type IConnections = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  messags: string[];
};
let connections: IConnections[] = [];
export function initializeSocket(server: http.Server) {
  const io = new SocketIOServer(server);

  io.on("connection", (client) => {
    console.log("New Connection!", client.id);
    connections.push({ messags: [], socket: client });

    client.on("disconnect", () => {
      console.log("User disconnected!");
      connections = connections.filter((c) => c.socket.id !== client.id);
      io.emit(
        "refreshConnection",
        connections.map((c) => c.socket.id)
      );
    });

    client.on("message", (message: { from: string; to: string; message: string }) => {
      console.log(
        `Enivando mensagem direta de: ${message.from} para ${message.to} mensagem: ${message.message}`
      );
      connections.forEach((c) => {
        if (c.socket.handshake.query.name || c.socket.id === message.to) {
          c.socket.emit("direct", { from: message.from, message: message.message });
        }
      });
    });

    ///

    io.emit(
      "refreshConnection",
      connections.map((c) => c.socket.handshake.query.name || c.socket.id)
    );
  });
}
