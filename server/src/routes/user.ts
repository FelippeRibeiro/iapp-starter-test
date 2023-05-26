import express from "express";

import { authenticateToken } from "../middlewere/auth";
import { getUser, valideUser } from "../controllers/user";

const router = express.Router();

// router.get("/", authenticateToken, getUser);

router.get("/validate", valideUser);

export default router;
