import express from "express";
import cors from "cors";
import logger from "morgan";

import connection from "./config/db";
import { authRouter } from "./routes/auth";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

connection.create();

app.use("/auth", authRouter);
