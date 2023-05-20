import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { SocketConfig } from "./sockets/socket";
import db from "./utils/db";
import UserRoute from "./routes/UserRoute";

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const socket = new SocketConfig(new Server(server));
socket.startSocket();
db.connect();

app.use("/api/user", UserRoute);

server.listen(3000, () => {
  console.log("Rodando na por 3000");
});
