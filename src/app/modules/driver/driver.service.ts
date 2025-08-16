import { DriverStatus, RideStatus, UserRole } from "../../interfaces/common";
import { ApiError } from "../../utils/ApiError";
import { ensureDriverProfile } from "../../utils/driver.utils";
import { Ride } from "../rider/rider.model";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';


export const DriverService ={

 acceptRide: async (driverId: string, rideId: string) => {
    const driver = await User.findById(driverId);

    if (!driver) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Driver not found');
    }

    if (driver.role !== UserRole.DRIVER) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Only drivers can accept rides');
    }

    // Ensure driver profile exists
    await ensureDriverProfile(driverId);

    if (driver.driver!.status !== DriverStatus.APPROVED) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Driver is not approved by admin');
    }

    // if (!driver.driver!.isAvailable) {
    //   throw new ApiError(httpStatus.FORBIDDEN, 'Driver must be online/available to accept rides');
    // }

    // Check active rides
    const hasActive = await Ride.findOne({
      driver: driverId,
      status: { $in: [RideStatus.ACCEPTED, RideStatus.PICKED_UP, RideStatus.IN_TRANSIT] }
    });
    if (hasActive) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Driver must finish current ride before accepting a new one');
    }

    // Validate ride
    const ride = await Ride.findById(rideId);
    if (!ride) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Ride not found');
    }
    if (ride.status !== RideStatus.REQUESTED) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Ride is not available to accept');
    }

    // Assign ride
    ride.driver = driverId as any;
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

    // if (!allowedNext[ride.status].includes(nextStatus))
    //   throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid status transition');

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
}