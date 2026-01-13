import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { JwtPayload } from "../common/@types/jwt-payload";
import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedError("Unauthorized");
    }

    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch {
    next(new UnauthorizedError("Unauthorized"));
  }
}
