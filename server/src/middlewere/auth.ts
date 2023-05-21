import passport from "passport";
import { Request, Response, NextFunction } from "express";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
    if (err || !user) {
      return res.status(401).json({ message: "Não autorizado" });
    }
    req.user = user;
    next();
  })(req, res, next);
};
