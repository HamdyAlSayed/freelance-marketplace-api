import { Router } from "express";
import {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
  deleteGig,
} from "../controllers/gig.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const protect = authMiddleware;
const router = Router();

/**
 * @swagger
 * /gigs:
 *   get:
 *     summary: Get all gigs
 *     responses:
 *       200:
 *         description: A list of gigs
 */
router.get("/", getAllGigs);

router.post("/", protect, authorize("Freelancer"), createGig);
router.get("/:id", getGigById);
router.put("/:id", protect, authorize("Freelancer"), updateGig);
router.delete("/:id", protect, authorize("Freelancer"), deleteGig);

export default router;