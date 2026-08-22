import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0.01, "Price must be a positive number"],
    },
    category: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
  },
);

export const Gig = mongoose.model("Gig", gigSchema);