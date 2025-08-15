// import { Request, Response, NextFunction } from "express";
// import { AppError } from "../errorHelpers/AppError";

// export const checkAuth = (role: string) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!req.user || req.user.role !== role) {
//       return next(new AppError("Forbidden: Insufficient permissions", 403));
//     }
//     next();
//   };
// };

// src/middlewares/checkAuth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '../interfaces/common';

export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
