import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Freelance Marketplace API v1",
  });
});

export default router;