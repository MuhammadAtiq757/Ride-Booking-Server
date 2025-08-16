import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import rideRoutes from '../modules/rider/rider.routes';
import driverRoutes from '../modules/driver/driver.routes';
import adminRoutes from '../modules/admin/admin.routes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/rides', rideRoutes);
router.use('/drivers', driverRoutes);
router.use('/admin', adminRoutes);

export default router;