import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { success } from '../../utils/ApiResponse';
import { User } from '../user/user.model';
import { catchAsync } from '../../utils/catchAsync';
import { Ride } from '../rider/rider.model';
import { DriverStatus, UserStatus } from '../../interfaces/common';

export const AdminController = {
  listUsers: catchAsync(async (_req: Request, res: Response) => {
    const users = await User.find().select('-password');
    res.status(httpStatus.OK).json(success('Users', users));
  }),

listRides: catchAsync(async (_req: Request, res: Response) => {
  const rides = await Ride.find()
    .sort({ createdAt: -1 })
    .populate('rider', '_id name email role status'); // populate the rider field with selected fields

  res.status(httpStatus.OK).json(success('Rides', rides));
}),
  approveDriver: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { 'driver.status': DriverStatus.APPROVED } },
      { new: true }
    );
    res.status(httpStatus.OK).json(success('Driver approved', user));
  }),

  suspendDriver: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { 'driver.status': DriverStatus.SUSPENDED, 'driver.isAvailable': false } },
      { new: true }
    );
    res.status(httpStatus.OK).json(success('Driver suspended', user));
  }),

  blockUser: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { $set: { status: UserStatus.BLOCKED } }, { new: true });
    res.status(httpStatus.OK).json(success('User blocked', user));
  }),

  unblockUser: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { $set: { status: UserStatus.ACTIVE } }, { new: true });
    res.status(httpStatus.OK).json(success('User unblocked', user));
  }),
};