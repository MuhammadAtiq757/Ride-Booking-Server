import httpStatus from 'http-status-codes';
import { ApiError } from '../../utils/ApiError';
import { User } from '../user/user.model';
import { DriverStatus, RideStatus, UserRole, UserStatus } from '../../interfaces/common';
import { Ride } from './rider.model';

export const RideService = {
  requestRide: async (
    riderId: string,
    payload: {
      pickup: { address?: string; coordinates: { lat: number; lng: number } };
      destination: { address?: string; coordinates: { lat: number; lng: number } };
    }
  ) => {
    // Ensure rider exists and is active
    const rider = await User.findById(riderId);
    if (!rider || rider.role !== UserRole.RIDER)
      throw new ApiError(httpStatus.FORBIDDEN, 'Only riders can request rides');
    if (rider.status !== UserStatus.ACTIVE)
      throw new ApiError(httpStatus.FORBIDDEN, 'Account blocked');

    // Ensure rider has no active ride
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

  acceptRide: async (driverId: string, rideId: string) => {
    const driver = await User.findById(driverId);
    if (!driver || driver.role !== UserRole.DRIVER)
      throw new ApiError(httpStatus.FORBIDDEN, 'Only drivers can accept rides');
    if (!driver.driver || driver.driver.status !== DriverStatus.APPROVED)
      throw new ApiError(httpStatus.FORBIDDEN, 'Driver not approved');
    if (!driver.driver.isAvailable)
      throw new ApiError(httpStatus.FORBIDDEN, 'Driver must be online to accept rides');

    const hasActive = await Ride.findOne({ driver: driverId, status: { $in: [
      RideStatus.ACCEPTED, RideStatus.PICKED_UP, RideStatus.IN_TRANSIT
    ] } });
    if (hasActive) throw new ApiError(httpStatus.BAD_REQUEST, 'Finish current ride first');

    const ride = await Ride.findById(rideId);
    if (!ride) throw new ApiError(httpStatus.NOT_FOUND, 'Ride not found');
    if (ride.status !== RideStatus.REQUESTED)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Ride is not available to accept');

    ride.driver = driverId as unknown as any;
    ride.status = RideStatus.ACCEPTED;
    ride.timeline.acceptedAt = new Date();
    await ride.save();
    return ride;
  },

  updateStatus: async (driverId: string, rideId: string, nextStatus: RideStatus) => {
    const ride = await Ride.findById(rideId);
    if (!ride) throw new ApiError(httpStatus.NOT_FOUND, 'Ride not found');
    if (String(ride.driver) !== driverId)
      throw new ApiError(httpStatus.FORBIDDEN, 'Not your ride');

    const allowedNext: Record<RideStatus, RideStatus[]> = {
      [RideStatus.REQUESTED]: [RideStatus.ACCEPTED],
      [RideStatus.ACCEPTED]: [RideStatus.PICKED_UP],
      [RideStatus.PICKED_UP]: [RideStatus.IN_TRANSIT],
      [RideStatus.IN_TRANSIT]: [RideStatus.COMPLETED],
      [RideStatus.COMPLETED]: [],
      [RideStatus.CANCELED]: [],
    };

    if (!allowedNext[ride.status].includes(nextStatus))
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid status transition');

    ride.status = nextStatus;
    const now = new Date();
    if (nextStatus === RideStatus.PICKED_UP) ride.timeline.pickedUpAt = now;
    if (nextStatus === RideStatus.IN_TRANSIT) ride.timeline.inTransitAt = now;
    if (nextStatus === RideStatus.COMPLETED) {
      ride.timeline.completedAt = now;
      // naive fare calculation for demo
      ride.fare = Math.floor(100 + Math.random() * 400);
      // increment earnings
      await User.findByIdAndUpdate(driverId, { $inc: { 'driver.earnings': ride.fare || 0 } });
    }

    await ride.save();
    return ride;
  },

  myRides: async (userId: string, role: UserRole) => {
    if (role === UserRole.RIDER) return Ride.find({ rider: userId }).sort({ createdAt: -1 });
    if (role === UserRole.DRIVER) return Ride.find({ driver: userId }).sort({ createdAt: -1 });
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid role');
  },
};
