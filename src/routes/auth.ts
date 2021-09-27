import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config as cfg } from "../config/config";
import { IUser } from "../database/models/users/users.types";

// JWT auth
export const authenticateJWT = (
  req: Request & { user?: string },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.toLowerCase().indexOf("bearer") === 0) {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      cfg.jwtSecret,
      (err, user: JwtPayload & { username: string }) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user.username;
        next();
      }
    );
  } else {
    res.sendStatus(401);
  }
};
