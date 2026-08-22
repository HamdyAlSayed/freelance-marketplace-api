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
/
 * @swagger
 * /gigs:
 *   get:
 *     summary: Get all gigs
 *     responses:
 *       200:
 *         description: A list of gigs
 */
router.get("/", getAllGigs);

/
 * @swagger
 * /gigs:
 *   post:
 *     summary: Create a new gig
 *     responses:
 *       201:
 *         description: Gig created successfully
 */
router.post("/", protect, authorize("Freelancer"), createGig);

/
 * @swagger
 * /gigs/{id}:
 *   get:
 *     summary: Get gig by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gig details
 */
router.get("/:id", getGigById);

/
 * @swagger
 * /gigs/{id}:
 *   put:
 *     summary: Update a gig
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gig updated successfully
 */
router.put("/:id", protect, authorize("Freelancer"), updateGig);

/**
 * @swagger
 * /gigs/{id}:
 *   delete:
 *     summary: Delete a gig
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gig deleted successfully
 */
router.delete("/:id", protect, authorize("Freelancer"), deleteGig);

export default router;