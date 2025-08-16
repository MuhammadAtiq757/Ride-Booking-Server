import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { RideService } from "./rider.service";
import { RideStatus, UserRole } from "../../interfaces/common";
import { sendResponse } from "../../utils/sendResponse";

export const RideController = {
  
  request: catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const ride = await RideService.requestRide(req.user!.id, req.body);

    sendResponse(res, {
      success: true,
      message: "Ride requested Successfully",
      data: ride,
      statusCode: httpStatus.CREATED,
    });
  }),

  cancel: catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const ride = await RideService.cancelRide(req.user!.id, req.params.id);

    sendResponse(res, {
      success: true,
      message: "Ride canceled successfully",
      data: ride,
      statusCode: httpStatus.OK,
    });
  }),

  myRides: catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const rides = await RideService.myRides(
      req.user!.id,
      req.user!.role as UserRole
    );

    sendResponse(res, {
      success: true,
      message: "Your rides",
      data: rides,
      statusCode: httpStatus.OK,
    });
  }),
};
