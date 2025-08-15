import { Document, Types } from 'mongoose';
import { RideStatus } from '../../interfaces/common';

export interface ILocation {
  address?: string;
  coordinates: { lat: number; lng: number };
}

export interface IRide extends Document {
  rider: Types.ObjectId;
  driver?: Types.ObjectId;
  pickup: ILocation;
  destination: ILocation;
  status: RideStatus;
  fare?: number;
  timeline: {
    requestedAt: Date;
    acceptedAt?: Date;
    pickedUpAt?: Date;
    inTransitAt?: Date;
    completedAt?: Date;
    canceledAt?: Date;
  };}