import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const AuthController = {
  register: catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body);

    sendResponse(res, {
      success: true,
      message: "Registered Successfully",
      data: result,
      statusCode: httpStatus.CREATED,
    });
  }),

  login: catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);

    sendResponse(res, {
      success: true,
      message: "Logged in Successfully",
      data: result,
      statusCode: httpStatus.OK,
    });
  }),
};
