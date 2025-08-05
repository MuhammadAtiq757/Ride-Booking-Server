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
  approved?: boolean;
  online?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
