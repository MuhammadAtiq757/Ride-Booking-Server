import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { usersService } from "./user.service";
import httpStatus from "http-status-codes"

const getAllUsers = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await usersService.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All Users Retrived Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

export const usersConterller = {
  getAllUsers
  
};