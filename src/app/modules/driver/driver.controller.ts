import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { success } from '../../utils/ApiResponse';
import { User } from '../user/user.model';
import { catchAsync } from '../../utils/catchAsync';

export const DriverController = {
  setAvailability: catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const { isAvailable } = req.body as { isAvailable: boolean };
    const user = await User.findByIdAndUpdate(
      req.user!.id,
      { $set: { 'driver.isAvailable': !!isAvailable } },
      { new: true }
    );
    res.status(httpStatus.OK).json(success('Availability updated', user?.driver));
  }),

  earnings: catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const user = await User.findById(req.user!.id);
    res.status(httpStatus.OK).json(success('Earnings', { earnings: user?.driver?.earnings || 0 }));
  }),
};