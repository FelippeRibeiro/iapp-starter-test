import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";

import { User } from "../models/User";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, document, password } = req.body;
    const existUser = await User.findOne({ document });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      document,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_SECRET || "8255", {
      expiresIn: "1h",
    });
    res.json({ token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = req.user;
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_SECRET || "8255", {
      expiresIn: "1h",
    });
    res.json({ token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
