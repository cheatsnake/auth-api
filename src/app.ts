import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router";
import appRouter from "./routes/app.router";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use(appRouter);

export default app;
