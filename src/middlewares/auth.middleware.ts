import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message:
          "Authorization token missing or invalid format. Expected format: 'Bearer <token>'",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token not found in authorization header",
      });
      return;
    }

    const decoded = verifyToken(token);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message || "Unauthorized",
    });
  }
};
