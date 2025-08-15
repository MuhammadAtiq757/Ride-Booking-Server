import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import { ApiError } from '../utils/ApiError';

export const notFound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({ success: false, message: 'Not found' });
};

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let status = httpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong';

  if (err instanceof ApiError) {
    status = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message || message;
  }

  res.status(status).json({ success: false, message });
};
