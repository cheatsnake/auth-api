import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router";
import appRouter from "./routes/app.router";
import errorMiddleware from "./middlewares/error.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use(appRouter);
app.use(errorMiddleware);

export default app;
