import { Schema, model } from "mongoose";

const rideSchema = new Schema(
  {
    rider: { type: Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: Schema.Types.ObjectId, ref: "User", default: null },
    pickupLocation: {
      address: String,
      coordinates: { type: [Number], index: "2dsphere" }, // [lng, lat]
    },
    destinationLocation: {
      address: String,
      coordinates: { type: [Number], index: "2dsphere" },
    },
    status: {
      type: String,
      enum: [
        "requested",
        "accepted",
        "picked_up",
        "in_transit",
        "completed",
        "canceled",
      ],
      default: "requested",
    },
    statusTimestamps: {
      requestedAt: { type: Date, default: Date.now },
      acceptedAt: Date,
      pickedUpAt: Date,
      inTransitAt: Date,
      completedAt: Date,
      canceledAt: Date,
    },
    fare: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Ride = model("Ride", rideSchema);
