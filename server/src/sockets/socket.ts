import { Server } from "socket.io";

type conn = {
  id: string;
  socket: any;
};

export class SocketConfig {
  conections: any[] = [];
  io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  startSocket() {
    this.io.on("connection", (client) => {
      console.log("New Connection!");

      client.on("disconnect", () => {
        console.log("User disconnected!");
        this.conections = this.conections.filter((c) => c.id !== client.id);
        this.io.emit(
          "refreshConnection",
          this.conections.map((c) => c.id)
        );
      });

      this.conections.push(client);

      this.io.emit(
        "refreshConnection",
        this.conections.map((c) => c.id)
      );

      client.on("direct", (message: { id: string; to: string; message: string }) => {
        console.log("Mensagem de direct!");
        console.log(message.message);

        this.conections.forEach((connection) => {
          if (connection.id === message.to) {
            connection.emit("direct", message);
          }
        });
      });
    });
  }
}
