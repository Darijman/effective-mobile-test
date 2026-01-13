import { User } from "@prisma/client";
import { BadRequestError } from "../../errors/bad-request.error";
import { prisma } from "../prisma/prisma.client";
import { ToggleActiveDto } from "./dtos/toggle-active.dto";
import { UsersPaginationDto } from "./dtos/users-pagination.dto";

export class UsersService {
  async getUserById(userId: string): Promise<Omit<User, "password">> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestError("User not found");
    }

    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getAllUsers(pagination: UsersPaginationDto): Promise<Omit<User, "password">[]> {
    const skip = Number(pagination.skip) || 0;
    let take = Number(pagination.take) || 10;

    if (take > 100) take = 100;

    const users = await prisma.user.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });

    return users.map(({ password: _password, ...u }) => u);
  }

  async toggleActive(userId: string, dto: ToggleActiveDto): Promise<Omit<User, "password">> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestError("User not found");
    }

    const { isActive } = dto;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive },
    });

    const { password: _password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}
