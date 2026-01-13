import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { Role } from "@prisma/client";

export function RolesGuardMiddleware(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return next(new UnauthorizedError("User not authenticated"));
    }

    if (!allowedRoles.includes(user.role)) {
      return next(new UnauthorizedError("You do not have permission to access this resource"));
    }

    next();
  };
}
