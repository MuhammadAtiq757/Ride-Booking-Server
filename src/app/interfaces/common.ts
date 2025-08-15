export enum UserRole {
  ADMIN = 'admin',
  RIDER = 'rider',
  DRIVER = 'driver',
}

export enum UserStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

export enum DriverStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  SUSPENDED = 'suspended',
  OFFLINE = 'offline',
  ONLINE = 'online',
}

export enum RideStatus {
  REQUESTED = 'requested',
  ACCEPTED = 'accepted',
  PICKED_UP = 'picked_up',
  IN_TRANSIT = 'in_transit',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

// src/interfaces/auth.ts
export interface AuthPayload {
  id: string;
  role: string;
  email: string;
}
