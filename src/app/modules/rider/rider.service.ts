import httpStatus from "http-status-codes";
import { Ride } from "./rider.model";
import { AppError } from "../../errorHelpers/AppError";

const requestRide = async (riderId: string, data: any) => {
  const ride = await Ride.create({
    rider: riderId,
    pickupLocation: data.pickupLocation,
    destinationLocation: data.destinationLocation,
  });
  return ride;
};

const cancelRide = async (rideId: string, riderId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new AppError("Ride not found", httpStatus.NOT_FOUND);
  if (ride.rider.toString() !== riderId) throw new AppError("Forbidden", 403);
  if (ride.status !== "requested") throw new AppError("Cannot cancel ride now", 400);

  ride.status = "canceled";
  // ride.statusTimestamps.canceledAt = new Date();
  await ride.save();
  return ride;
};

const getRideHistory = async (riderId: string) => {
  return Ride.find({ rider: riderId }).sort({ createdAt: -1 });
};

export const RideService = {
  requestRide,
  cancelRide,
  getRideHistory,
};
