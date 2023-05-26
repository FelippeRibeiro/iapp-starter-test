import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import { json } from "stream/consumers";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const document = req.params.document;
    const user = await User.findOne({ document });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const valideUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const valide = jwt.verify(token.split(" ")[1], "8255") as JwtPayload;
    res.status(200).json({ name: valide.name });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
