import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { allowRoles } from '../../middlewares/auth';
import { UserRole } from '../../interfaces/common';
import { RideController } from './rider.controller';

const router = Router();

// Riders
router.post('/request', checkAuth, allowRoles(UserRole.RIDER), RideController.request);
router.patch('/:id/cancel', checkAuth, allowRoles(UserRole.RIDER), RideController.cancel);
router.get('/me', checkAuth, allowRoles(UserRole.RIDER, UserRole.DRIVER), RideController.myRides);

// Drivers
router.patch('/:id/accept', checkAuth, allowRoles(UserRole.DRIVER), RideController.accept);
router.patch('/:id/status', checkAuth, allowRoles(UserRole.DRIVER), RideController.updateStatus);

export default router;
