import { Document } from 'mongoose';
import { DriverStatus, UserRole, UserStatus } from '../../interfaces/common';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
   driver?: {
    status: DriverStatus;
    vehicleType?: string;
    vehicleNumber?: string;
    isAvailable?: boolean;
    earnings?: number;
  };
  comparePassword(candidate: string): Promise<boolean>;
}
