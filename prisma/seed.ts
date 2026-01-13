import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("123456", 10);
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: "Admin",
      lastName: "Master",
      email: "admin@gmail.com",
      password,
      role: Role.ADMIN,
      isActive: true,
      birthDate: new Date("1990-01-01"),
    },
  });

  await prisma.user.create({
    data: {
      name: "John",
      lastName: "Doe",
      email: "bob@gmail.com",
      password,
      role: Role.USER,
      isActive: true,
      birthDate: new Date("1965-10-22"),
    },
  });

  console.log("Seed finished:");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
