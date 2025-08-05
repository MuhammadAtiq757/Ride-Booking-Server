// src/routes/auth.routes.ts

import express from 'express';
import { AuthController } from './auth.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';

const router = express.Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.credentialsLogin);



export const AuthRoutes = router;