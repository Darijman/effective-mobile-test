**Запуск:**

1. npm i
2. npm run seed - для создания тестовых пользователей (/prisma/seed.ts)
3. npm run dev - "http://localhost:9000"

**Тестовые Юзеры:**

## ADMIN:

{

name: "Admin",

lastName: "Master",

email: "admin@gmail.com",

password: "123456",

role: Role.ADMIN,

isActive: true,

birthDate: new Date("1990-01-01"),

},

## USER:

{

name: "John",

lastName: "Doe",

email: "bob@gmail.com",

password: "123456",

role: Role.USER,

isActive: true,

birthDate: new Date("1965-10-22"),

},
