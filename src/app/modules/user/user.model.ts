import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from '../../config';
import { IUser } from './user.interface';
import { DriverStatus, UserRole, UserStatus } from '../../interfaces/common';

const driverSchema = new Schema(
  {
    status: {
      type: String,
      enum: Object.values(DriverStatus),
      default: DriverStatus.PENDING,
    },
    vehicleType: String,
    vehicleNumber: String,
    isAvailable: { type: Boolean, default: false },
    earnings: { type: Number, default: 0 },
  },
  { _id: false }
);


const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.RIDER,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
     driver: {
      type: driverSchema,
      required: false,
      default: () => ({ status: DriverStatus.PENDING, isAvailable: false }),
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, config.bcryptRounds);
  next();
});

userSchema.methods.comparePassword = async function (candidate: string) {
  // @ts-ignore
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);