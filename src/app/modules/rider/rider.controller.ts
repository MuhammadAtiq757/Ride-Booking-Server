import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { success } from '../../utils/ApiResponse';
import { catchAsync } from '../../utils/catchAsync';
import { RideService } from './rider.service';
import { RideStatus, UserRole } from '../../interfaces/common';

export const RideController = {
  request: catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const ride = await RideService.requestRide(req.user!.id, req.body);
    res.status(httpStatus.CREATED).json(success('Ride requested', ride));
  }),

  cancel: catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const ride = await RideService.cancelRide(req.user!.id, req.params.id);
    res.status(httpStatus.OK).json(success('Ride canceled', ride));
  }),

  accept: catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const ride = await RideService.acceptRide(req.user!.id, req.params.id);
    res.status(httpStatus.OK).json(success('Ride accepted', ride));
  }),

  updateStatus: catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const ride = await RideService.updateStatus(req.user!.id, req.params.id, req.body.status as RideStatus);
    res.status(httpStatus.OK).json(success('Ride status updated', ride));
  }),

  myRides: catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const rides = await RideService.myRides(req.user!.id, req.user!.role as UserRole);
    res.status(httpStatus.OK).json(success('Your rides', rides));
  }),
};