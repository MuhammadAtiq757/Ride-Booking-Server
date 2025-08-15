import mongoose, { Schema } from 'mongoose';
import { IRide } from './rider.interface';
import { RideStatus } from '../../interfaces/common';


const locationSchema = new Schema(
  {
    address: String,
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { _id: false }
);

const rideSchema = new Schema<IRide>(
  {
    rider: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    driver: { type: Schema.Types.ObjectId, ref: 'User' },
    pickup: { type: locationSchema, required: true },
    destination: { type: locationSchema, required: true },
    status: {
      type: String,
      enum: Object.values(RideStatus),
      default: RideStatus.REQUESTED,
      index: true,
    },
    fare: { type: Number },
    timeline: {
      requestedAt: { type: Date, default: () => new Date() },
      acceptedAt: Date,
      pickedUpAt: Date,
      inTransitAt: Date,
      completedAt: Date,
      canceledAt: Date,
    },
  },
  { timestamps: true }
);

export const Ride = mongoose.model<IRide>('Ride', rideSchema);