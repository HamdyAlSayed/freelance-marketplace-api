import { Router } from "express";
import {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
  deleteGig,
} from "../controllers/gig.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

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
