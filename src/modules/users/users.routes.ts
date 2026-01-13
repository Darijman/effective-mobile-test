import { Router, Request, Response, NextFunction } from "express";
import { UsersService } from "./users.service";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { RolesGuardMiddleware } from "../../middlewares/roles-guard.middleware";
import { Role } from "@prisma/client";
import { validateDtoMiddleware } from "../../middlewares/validate-dto.middleware";
import { ToggleActiveDto } from "./dtos/toggle-active.dto";
import { UsersPaginationDto } from "./dtos/users-pagination.dto";

export const users = Router();
const usersService = new UsersService();

users.get(
  "/",
  authMiddleware,
  RolesGuardMiddleware(Role.ADMIN),
  validateDtoMiddleware(UsersPaginationDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pagination = req.query as unknown as UsersPaginationDto;
      const users = await usersService.getAllUsers(pagination);
      res.json(users);
    } catch (err) {
      next(err);
    }
  },
);

users.get("/:id", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;

    if (req.user.role !== Role.ADMIN && req.user.id !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await usersService.getUserById(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

users.patch(
  "/:id/active",
  authMiddleware,
  validateDtoMiddleware(ToggleActiveDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;

      if (req.user.role !== Role.ADMIN && req.user.id !== id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const updatedUser = await usersService.toggleActive(id, req.body);
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  },
);
