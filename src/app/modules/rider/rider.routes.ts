import express from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';
import { RideController } from './rider.controller';

const router = express.Router();

router.post('/request', authenticate, checkAuth(Role.RIDER), RideController.requestRide);
router.patch('/cancel/:id', authenticate, checkAuth(Role.RIDER), RideController.cancelRide);
router.get('/history', authenticate, checkAuth(Role.RIDER), RideController.getRideHistory);

export const RiderRoutes = router;
