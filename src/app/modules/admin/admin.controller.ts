import { Request, Response } from "express";
import { User } from "../user/user.model";
import { catchAsync } from "../../utils/catchAsync";
import { Ride } from "../rider/rider.model";
import { DriverStatus, UserStatus } from "../../interfaces/common";
import { sendResponse } from "../../utils/sendResponse";

export const AdminController = {
  listUsers: catchAsync(async (_req: Request, res: Response) => {
    const users = await User.find().select("-password");
    sendResponse(res, {
      success: true,
      message: "Users",
      data: users,
    });
  }),

  listRides: catchAsync(async (_req: Request, res: Response) => {
    const rides = await Ride.find()
      .sort({ createdAt: -1 })
      .populate("rider", "_id name email role status");

    sendResponse(res, {
      success: true,
      message: "Rides",
      data: rides,
    });
  }),

  approveDriver: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { "driver.status": DriverStatus.APPROVED } },
      { new: true }
    );
    sendResponse(res, {
      success: true,
      message: "Driver approved Successfully",
      data: user,
    });
  }),

  suspendDriver: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          "driver.status": DriverStatus.SUSPENDED,
          "driver.isAvailable": false,
        },
      },
      { new: true }
    );
    sendResponse(res, {
      success: true,
      message: "Driver suspended Successfully",
      data: user,
    });
  }),

  blockUser: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { status: UserStatus.BLOCKED } },
      { new: true }
    );
    sendResponse(res, {
      success: true,
      message: "User blocked Successfully",
      data: user,
    });
  }),

  unblockUser: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { status: UserStatus.ACTIVE } },
      { new: true }
    );
    sendResponse(res, {
      success: true,
      message: "User unblocked Successfully",
      data: user,
    });
  }),
};
