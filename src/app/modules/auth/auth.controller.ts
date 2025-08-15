import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { success } from '../../utils/ApiResponse';
import { AuthService } from './auth.service';
import { catchAsync } from '../../utils/catchAsync';

export const AuthController = {
  register: catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body);
    res.status(httpStatus.CREATED).json(success('Registered', result));
  }),

  login: catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);
    res.status(httpStatus.OK).json(success('Logged in', result));
  }),
};