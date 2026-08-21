import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Freelance Marketplace API is working!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});