"use strict";
// // src/middlewares/auth.middleware.ts
// import { Request, Response, NextFunction } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { AppError } from '../errorHelpers/AppError';
// import { User } from '../modules/user/user.model';
// interface JwtPayloadCustom extends JwtPayload {
//   id: string;
//   role: 'rider' | 'driver' | 'admin';
// }
// // Extend Express Request interface
// declare global {
//   namespace Express {
//     interface Request {
//       user?: JwtPayloadCustom & { id: string; role: 'rider' | 'driver' | 'admin' };
//     }
//   }
// }
// export const authenticate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const authHeader = req.headers.authorization;
//   console.log('Authorization header:', authHeader);
//   if (!authHeader) {
//     return next(new AppError('Unauthorized: No token provided', 401));
//   }
//   // Support both "Bearer <token>" and just "<token>"
//   const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Secret') as JwtPayloadCustom;
//     const user = await User.findById(decoded.id);
//     if (!user || user.isBlocked) {
//       return next(new AppError('User not found or blocked', 401));
//     }
//     req.user = {
//       id: user._id.toString(),
//       role: user.role,
//     };
//     next();
//   } catch (err: any) {
//     if (err.name === 'TokenExpiredError') {
//       return next(new AppError('Token expired', 401));
//     }
//     return next(new AppError('Invalid or expired token', 401));
//   }
// };
