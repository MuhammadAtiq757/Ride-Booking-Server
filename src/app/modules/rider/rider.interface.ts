import { Document, Types } from 'mongoose';

export type RideStatus =
  | 'requested'
  | 'accepted'
  | 'picked_up'
  | 'in_transit'
  | 'completed'
  | 'cancelled';

export interface IRide extends Document {
  rider: Types.ObjectId;
  driver?: Types.ObjectId;
  pickupLocation: {
    address: string;
    coordinates: [number, number]; // [lng, lat]
  };
  destination: {
    address: string;
    coordinates: [number, number];
  };
  status: RideStatus;
  fare?: number;
  distance?: number;
  duration?: string;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}