import mongoose from "mongoose";
export interface IOrder {
    gig: mongoose.Types.ObjectId;
    client: mongoose.Types.ObjectId;
    status: "pending" | "accepted" | "completed";
    createdAt?: Date;
    updatedAt?: Date;
}

const orderSchema = new mongoose.Schema({
    gig:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gig",
        required: true
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ["pending", "accepted", "completed"],
        default: "pending"
    }
    },
    {
        timestamps: true
    })

export const Order = mongoose.model("Order", orderSchema);
