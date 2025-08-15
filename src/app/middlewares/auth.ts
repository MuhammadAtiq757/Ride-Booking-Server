import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status-codes';
import { config } from '../config';
import { ApiError } from '../utils/ApiError';
import { UserRole } from '../interfaces/common';

export interface AuthPayload {
  id: string;
  role: UserRole;
}

export const checkAuth = (
  req: Request & { user?: AuthPayload },
  _res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as AuthPayload;
    req.user = decoded;
    next();
  } catch {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
  }
};

export const allowRoles = (...roles: UserRole[]) => {
  return (
    req: Request & { user?: AuthPayload },
    _res: Response,
    next: NextFunction
  ) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
    next();
  };
};