import express from "express";
import UserControler from "../controllers/UserController";
const router = express.Router();

router.post("/", UserControler.createUser);

router.get("/:cpf", UserControler.getByCpf);

export default router;
