// src/app/middlewares/notFound.ts
import { Request, Response, NextFunction } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: error.message,
  });
};

export default notFound;