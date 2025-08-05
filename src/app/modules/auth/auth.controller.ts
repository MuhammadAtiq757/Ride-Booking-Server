// src/controllers/auth.controller.ts

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import { AppError } from '../../errorHelpers/AppError';

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthService.registerUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User registered successfully',
      data: user,
    });
  }
);

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Email and password are required', 400));
    }

    const loginInfo = await AuthService.credentialsLogin(email, password);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User logged in successfully',
      data: loginInfo,
    });
  }
);



export const AuthController = {
  registerUser,
  credentialsLogin,
};