import { Request, Response } from "express";
import { Order } from "../models/order.model";
import { Gig } from "../models/gig.model";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { gigID } = req.body;

        const gigExist = await Gig.findById(gigID);

        if (!gigExist) {
            return res.status(404).json({
                msg: "This gig is not found!"
            });
        }

        if (gigExist.owner.toString() === req.user?.id) {
            return res.status(403).json({
                msg: "You cannot place an order on your own gig!"
            });
        }

        const newOrder = await Order.create({
            gig: gigID,
            client: req.user?.id
        });

        return res.status(201).json({
            msg: "Order created successfully!",
            order: newOrder
        });

    } catch (error) {
        return res.status(500).json({
            msg: "Server error happened!"
        });
    }
};

export const getMyOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({
            client: req.user?.id
        });

        return res.status(200).json({
            orders
        });

    } catch (error) {
        return res.status(500).json({
            msg: "Server error happened!"
        });
    }
};

export const getOrdersForMyGigs = async (req: Request, res: Response) => {
    try {
        const gigs = await Gig.find({
            owner: req.user?.id
        });

        const gigIds = gigs.map((gig) => gig._id);

        const orders = await Order.find({
            gig: { $in: gigIds }
        });

        return res.status(200).json({
            orders
        });

    } catch (error) {
        return res.status(500).json({
            msg: "Server error happened!"
        });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                msg: "Order not found!"
            });
        }

        const gig = await Gig.findById(order.gig);

        if (!gig) {
            return res.status(404).json({
                msg: "Gig not found!"
            });
        }

        if (gig.owner.toString() !== req.user?.id) {
            return res.status(403).json({
                msg: "You can only update orders for your own gigs!"
            });
        }

        if (
            (order.status === "pending" && status !== "accepted") ||
            (order.status === "accepted" && status !== "completed") ||
            order.status === "completed"
        ) {
            return res.status(400).json({
                msg: "Invalid order status transition!"
            });
        }

        order.status = status;
        await order.save();

        return res.status(200).json({
            msg: "Order status updated successfully!",
            order
        });

    } catch (error) {
        return res.status(500).json({
            msg: "Server error happened!"
        });
    }
};
