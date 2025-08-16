// utils/sendResponse.ts
import { Response } from "express";
import httpStatus from "http-status-codes";

interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null;
  statusCode?: number;
}

export const sendResponse = <T>(
  res: Response,
  {
    success,
    message,
    data = null,
    statusCode = httpStatus.OK,
  }: IApiResponse<T>
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};
