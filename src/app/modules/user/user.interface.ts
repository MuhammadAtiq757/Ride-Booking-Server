import { Document } from 'mongoose';
import { DriverStatus, UserRole, UserStatus } from '../../interfaces/common';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  driver?: {
    status: DriverStatus; // approval & activity
    vehicleType?: string;
    vehicleNumber?: string;
    isAvailable?: boolean; // online/offline
    earnings?: number;
  };
  comparePassword(candidate: string): Promise<boolean>;
}
