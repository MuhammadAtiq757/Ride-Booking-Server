import jwt from 'jsonwebtoken';
import httpStatus from 'http-status-codes';
import { config } from '../../config';
import { ApiError } from '../../utils/ApiError';
import { User } from '../user/user.model';
import { DriverStatus, UserRole, UserStatus } from '../../interfaces/common';

export const AuthService = {
  register: async (payload: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    vehicleType?: string;
    vehicleNumber?: string;
  }) => {
    const exists = await User.findOne({ email: payload.email });
    if (exists) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already in use');

    let driver;
    const role = payload.role || UserRole.RIDER;
    if (role === UserRole.DRIVER) {
      driver = {
        status: DriverStatus.PENDING,
        vehicleType: payload.vehicleType,
        vehicleNumber: payload.vehicleNumber,
        isAvailable: false,
        earnings: 0,
      };
    }

    const user = await User.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role,
      status: UserStatus.ACTIVE,
      driver,
    });

    return { id: user._id, role: user.role };
  },

  login: async (payload: { email: string; password: string }) => {
    const user = await User.findOne({ email: payload.email }).select('+password');
    if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    const ok = await user.comparePassword(payload.password);
    if (!ok) throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');

    if (user.status !== UserStatus.ACTIVE)
      throw new ApiError(httpStatus.FORBIDDEN, 'Account blocked');

    const token = jwt.sign({ id: user._id, role: user.role }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    return { token, role: user.role };
  },
};
