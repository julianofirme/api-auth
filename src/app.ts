import * as express from "express";
import * as cors from "cors";
import * as logger from "morgan";

import { connectToDb } from "./config/db";
import { authRouter } from "./routes/Auth";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

connectToDb();

app.use("/auth", authRouter);
