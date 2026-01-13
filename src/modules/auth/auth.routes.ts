import { Router, Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { validateDtoMiddleware } from "../../middlewares/validate-dto.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const auth = Router();
const authService = new AuthService();

auth.post("/register", validateDtoMiddleware(RegisterDto), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = await authService.register(req.body);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60, // 1 час
    });

    res.status(201).json(true);
  } catch (err) {
    next(err);
  }
});

auth.post("/login", validateDtoMiddleware(LoginDto), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = await authService.login(req.body);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60, // 1 час
    });

    res.status(200).json(true);
  } catch (err) {
    next(err);
  }
});

auth.get("/me", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
});
