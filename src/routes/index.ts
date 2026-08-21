import { Router } from "express";
import authRoutes from "./auth.routes";
import orderRoutes from "./order.routes";
import gigRoutes from "./gig.routes";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Freelance Marketplace API v1",
  });
});

router.use("/auth", authRoutes);
router.use("/orders", orderRoutes);
// router.use("/gigs", gigRoutes);

export default router;
