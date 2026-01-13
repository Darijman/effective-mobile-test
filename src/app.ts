import { users } from "./modules/users/users.routes";
import { auth } from "./modules/auth/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/users", users);
app.use("/auth", auth);

app.use(errorMiddleware);
