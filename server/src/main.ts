import express from "express";
import http from "http";
import passport from "passport";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { initializeDatabase } from "./config/database";
import passportConfig from "./config/passport";
import { initializeSocket } from "./config/socket";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

initializeDatabase();

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passportConfig(passport);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

initializeSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
