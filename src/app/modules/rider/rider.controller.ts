import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { RideService } from "./rider.service";

export const RideController = {
  requestRide: catchAsync(async (req: Request, res: Response) => {
    const result = await RideService.requestRide(req.user!.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Ride requested successfully",
      data: result,
    });
  }),

  cancelRide: catchAsync(async (req: Request, res: Response) => {
    const result = await RideService.cancelRide(req.params.id, req.user!.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Ride canceled",
      data: result,
    });
  }),

  getRideHistory: catchAsync(async (req: Request, res: Response) => {
    const result = await RideService.getRideHistory(req.user!.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Ride history fetched",
      data: result,
    });
  }),
};
