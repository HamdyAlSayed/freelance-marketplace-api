import { Request, Response } from "express";

import { Order } from "../models/order.model";
import { Gig } from "../models/gig.model";
export const createOrder = async (req: Request, res: Response) => {
    const { gigID } = req.body;

    const gigExist = await Gig.findById(gigID);

    if (!gigExist) {
        return res.status(404).json({
            msg: "This gig is not found!"
        });
    }

    if (req.user?.role !== "Client") {
        return res.status(403).json({
            msg: "Only clients can place an order!"
        });
    }

    if (gigExist.owner.toString() === req.user.id) {
        return res.status(403).json({
            msg: "You cannot place an order on your own gig!"
        });
    }

    const newOrder = await Order.create({
        gig: gigID,
        client: req.user.id
    });

    return res.status(201).json({
        msg: "Order created successfully!",
        order: newOrder
    });
};

export const getMyOrders = async (req: Request, res: Response) => {
    if(req.user?.role !== "Client"){
                return res.status(403).json({
            msg: "Only Clients can see their orders!"
        });
    }

    const orders = await Order.find({
        client: req.user.id
    });
    
    return res.status(200).json({
        orders
    });
}

export const getOrdersForMyGigs = async (req: Request, res: Response) => {
    if (req.user?.role !== "Freelancer") {
        return res.status(403).json({
            msg: "Only Freelancers can see orders for their gigs!"
        });
    }

    const gigs = await Gig.find({
        owner: req.user.id
    });

    const gigIds = gigs.map((gig) => gig._id);

    const orders = await Order.find({
        gig: { $in: gigIds }
    });

    return res.status(200).json({
        orders
    });
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (req.user?.role !== "Freelancer") {
        return res.status(403).json({
            msg: "Only Freelancers can update order status!"
        });
    }

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

    if (gig.owner.toString() !== req.user.id) {
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
};