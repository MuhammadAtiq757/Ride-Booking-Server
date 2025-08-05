import { Request, Response, NextFunction } from "express";
import { AppError } from "../errorHelpers/AppError";

export const checkAuth = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return next(new AppError("Forbidden: Insufficient permissions", 403));
    }
    next();
  };
};
