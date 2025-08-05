export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'rider' | 'driver';
  isBlocked?: boolean;
  approved?: boolean;
  online?: boolean;
}

export interface IRide {
  rider: string;
  driver?: string;
  pickup: string;
  destination: string;
  status?: string;
}