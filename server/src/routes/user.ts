import express from "express";

import { authenticateToken } from "../middlewere/auth";
import { getUser } from "../controllers/user";

const router = express.Router();

router.get("/:document", authenticateToken, getUser);

export default router;
