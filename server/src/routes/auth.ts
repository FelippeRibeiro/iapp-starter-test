import express from "express";
import { login, signup } from "../controllers/auth";
import passport from "passport";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", passport.authenticate("local", { session: false }), login);

export default router;
