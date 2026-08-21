import { Request, Response } from "express";
import { Gig } from "../models/gig.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";



export async function createGig(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { title, description, price, category } = req.body;

    const gig = await Gig.create({
      title,
      description,
      price,
      category,
      owner: req.user?.id,
    });

    res.status(201).json(gig);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create gig.",
      error,
    });
  }
}

export const getAllGigs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category, search, minPrice, maxPrice, freelancerName } = req.query;
    const filter: Record<string, any> = {};

    if (category) filter.category = category;
    if (search) filter.title = { $regex: search as string, $options: "i" };

    if (minPrice || maxPrice) {
      const priceFilter: Record<string, number> = {};

      if (minPrice) priceFilter.$gte = Number(minPrice);
      if (maxPrice) priceFilter.$lte = Number(maxPrice);

      filter.price = priceFilter;
    }

if (freelancerName) {
  const matchingOwners = await User.find({
    fullName: { $regex: freelancerName as string, $options: "i" },
  }).select("_id");

  filter.owner = {
    $in: matchingOwners.map((user) => user._id.toString()),
  };
}

    const gigs = await Gig.find(filter);

    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch gigs.",
      error,
    });
  }
};

export const getGigById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      res.status(404).json({ message: "Gig not found." });
      return;
    }

    res.status(200).json(gig);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch gig.",
      error,
    });
  }
};

export const updateGig = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const gig = await Gig.findOneAndUpdate(
      { _id: req.params.id, owner: req.user?.id },
      req.body,
      { new: true }
    );

    if (!gig) {
      res.status(404).json({ message: "Gig not found." });
      return;
    }

    res.status(200).json(gig);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update gig.",
      error,
    });
  }
};


export const deleteGig = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      res.status(404).json({ message: "Gig not found." });
      return;
    }

    if (gig.owner !== req.user?.id) {
      res.status(403).json({ message: "Not authorized to delete this gig." });
      return;
    }

    const activeOrdersCount = await Order.countDocuments({
      gig: gig._id,
      status: { $in: ["pending", "accepted"] },
    });

    if (activeOrdersCount > 0) {
      res.status(400).json({
        message: "Cannot delete a gig with pending or accepted orders.",
      });
      return;
    }

    await gig.deleteOne();

    res.status(200).json({
      message: "Gig removed from the platform.",
      gig,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete gig.",
      error,
    });
  }
};
