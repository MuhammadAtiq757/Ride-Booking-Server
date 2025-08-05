// src/services/auth.service.ts

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { AppError } from '../../errorHelpers/AppError';

const JWT_SECRET ="Secret";
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const registerUser = async (data: IUser) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new AppError('Email already in use', 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashedPassword });

  // Remove password before returning
  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

export const credentialsLogin = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError('User does not exist', 400);
  }

  if (user.isBlocked) {
    throw new AppError('User is blocked', 403);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1d',
  });

  const { password: _, ...userWithoutPassword } = user.toObject();

  return {
    token,
    user: userWithoutPassword,
  };
};


export const AuthService = {
  registerUser,
  credentialsLogin,

};