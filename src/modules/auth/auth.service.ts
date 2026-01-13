import { prisma } from "../prisma/prisma.client";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { BadRequestError } from "../../errors/bad-request.error";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { Role } from "@prisma/client";
import { JWT_SECRET } from "../../middlewares/auth.middleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_EXPIRES_IN = "1h";

export class AuthService {
  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    const { name, lastName, middleName, email, password, birthDate } = registerDto;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        lastName,
        middleName,
        birthDate: new Date(birthDate),
        email,
        password: hashedPassword,
        role: Role.USER,
        isActive: true,
      },
    });

    const access_token = this.generateToken(user.id, user.role);
    return { access_token };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const access_token = this.generateToken(user.id, user.role);
    return { access_token };
  }

  private generateToken(userId: string, role: Role) {
    return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }
}
