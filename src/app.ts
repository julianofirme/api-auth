import * as express from "express";
import * as cors from "cors";
import * as logger from "morgan";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));
