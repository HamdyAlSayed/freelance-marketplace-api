import { Request, Response, NextFunction } from "express";

export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Access denied. Please log in first.",
      });
      return;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      res.status(403).json({
        success: false,
        message: "Forbidden: You do not have permission to perform this action.",
      });
      return;
    }

    next();
  };
};