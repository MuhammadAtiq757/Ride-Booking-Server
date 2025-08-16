import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { RideStatus } from "../../interfaces/common";
import { DriverService } from "./driver.service";

export const DriverController = {
  accept: catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const ride = await DriverService.acceptRide(req.user!.id, req.params.id);

    sendResponse(res, {
      success: true,
      message: "Ride accepted",
      data: ride,
      statusCode: httpStatus.OK,
    });
  }),

  updateStatus: catchAsync(
    async (req: Request & { user?: any }, res: Response) => {
      const ride = await DriverService.updateStatus(
        req.user!.id,
        req.params.id,
        req.body.status as RideStatus
      );

      sendResponse(res, {
        success: true,
        message: "Ride status updated",
        data: ride,
        statusCode: httpStatus.OK,
      });
    }
  ),

  setAvailability: catchAsync(
    async (req: Request & { user?: any }, res: Response) => {
      const { isAvailable } = req.body as { isAvailable: boolean };
      const user = await User.findByIdAndUpdate(
        req.user!.id,
        { $set: { "driver.isAvailable": !!isAvailable } },
        { new: true }
      );

      sendResponse(res, {
        success: true,
        message: "Availability updated successfully",
        data: user?.driver,
      });
    }
  ),

  earnings: catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const user = await User.findById(req.user!.id);

    sendResponse(res, {
      success: true,
      message: "Total Earning",
      data: { earnings: user?.driver?.earnings || 0 },
    });
  }),
};
