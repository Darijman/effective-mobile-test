import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/http.error";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: "Internal server error" });
}
