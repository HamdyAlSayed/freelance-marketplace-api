import { Router } from "express";
import {createOrder, getMyOrders, getOrdersForMyGigs, updateOrderStatus} from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();


/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     tags: [Orders]
 *     summary: Create a new order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gigID
 *             properties:
 *               gigID:
 *                 type: string
 *                 description: The ID of the gig to order
 *     responses:
 *       201:
 *         description: Order created successfully
 *       403:
 *         description: Only clients can place an order
 *       404:
 *         description: Gig not found
 *       500:
 *         description: Some server error!
 */
router.post("/",authMiddleware, authorize("Client"), createOrder);





/**
 * @swagger
 * /api/v1/orders/my-orders:
 *   get:
 *     tags: [Orders]
 *     summary: Get the logged-in client's orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       403:
 *         description: Only clients can view their orders
 *       500:
 *         description: Some server error!
 */
router.get("/my-orders",authMiddleware, authorize("Client"), getMyOrders);







/**
 * @swagger
 * /api/v1/orders/gig-orders:
 *   get:
 *     tags: [Orders]
 *     summary: Get orders placed on the logged-in freelancer's gigs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       403:
 *         description: Only freelancers can view orders for their gigs
 *       500:
 *         description: Some server error!
 */
router.get("/gig-orders", authMiddleware,authorize("Freelancer"), getOrdersForMyGigs);








/**
 * @swagger
 * /api/v1/orders/{id}/status:
 *   patch:
 *     tags: [Orders]
 *     summary: Update an order's status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, accepted, completed]
 *                 description: The new order status
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Invalid order status transition
 *       403:
 *         description: Only the owner of the gig can update the order
 *       404:
 *         description: Order or gig not found
 *       500:
 *         description: Some server error!
 */
router.patch("/:id/status", authMiddleware,authorize("Freelancer"), updateOrderStatus);



export default router;