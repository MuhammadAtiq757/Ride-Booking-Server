import httpStatus from 'http-status-codes';
import { ApiError } from '../../utils/ApiError';
import { User } from '../user/user.model';
import {RideStatus, UserRole, UserStatus } from '../../interfaces/common';
import { Ride } from './rider.model';

export const RideService = {
  requestRide: async (
    riderId: string,
    payload: {
      pickup: { address?: string; coordinates: { lat: number; lng: number } };
      destination: { address?: string; coordinates: { lat: number; lng: number } };
    }
  ) => {
 
    const rider = await User.findById(riderId);
    if (!rider || rider.role !== UserRole.RIDER)
      throw new ApiError(httpStatus.FORBIDDEN, 'Only riders can request rides');
    if (rider.status !== UserStatus.ACTIVE)
      throw new ApiError(httpStatus.FORBIDDEN, 'Account blocked');

 
    const active = await Ride.findOne({ rider: riderId, status: { $in: [
      RideStatus.REQUESTED, RideStatus.ACCEPTED, RideStatus.PICKED_UP, RideStatus.IN_TRANSIT
    ] } });
    if (active) throw new ApiError(httpStatus.BAD_REQUEST, 'You already have an active ride');

    const ride = await Ride.create({ rider: riderId, ...payload, status: RideStatus.REQUESTED });
    return ride;
  },

  cancelRide: async (riderId: string, rideId: string) => {
    const ride = await Ride.findById(rideId);
    if (!ride) throw new ApiError(httpStatus.NOT_FOUND, 'Ride not found');
    if (String(ride.rider) !== riderId) throw new ApiError(httpStatus.FORBIDDEN, 'Not your ride');
    if (ride.status !== RideStatus.REQUESTED)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot cancel after driver accepts');

    ride.status = RideStatus.CANCELED;
    ride.timeline.canceledAt = new Date();
    await ride.save();
    return ride;
  },



  myRides: async (userId: string, role: UserRole) => {
    if (role === UserRole.RIDER) return Ride.find({ rider: userId }).sort({ createdAt: -1 });
    if (role === UserRole.DRIVER) return Ride.find({ driver: userId }).sort({ createdAt: -1 });
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid role');
  },
};
