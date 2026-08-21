import { Request, Response, NextFunction } from "express";
 
export const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.parse) {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        });
      }
      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors || error.message,
      });
    }
  };
};