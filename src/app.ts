import express, { Application, Request, Response } from "express";
import { errorHandler } from "./middleware/errorHandler";

const app: Application = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.use(errorHandler);

export default app;