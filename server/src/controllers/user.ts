import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

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
