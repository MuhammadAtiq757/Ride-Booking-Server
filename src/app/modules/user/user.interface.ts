// interfaces/user.interface.ts

// src/constants/role.enum.ts
export enum Role {
  ADMIN = 'admin',
  DRIVER = 'driver',
  RIDER = 'rider'
}


export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role?: Role;
  isBlocked?: boolean;
  isApproved?: boolean; 
  availability?: boolean; 
    vehicleInfo?: {
    type: string;
    plate: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
