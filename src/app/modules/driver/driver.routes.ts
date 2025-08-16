import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { allowRoles } from '../../middlewares/auth';
import { DriverController } from './driver.controller';
import { UserRole } from '../../interfaces/common';


const router = Router();
router.patch('/:id/accept', checkAuth, allowRoles(UserRole.DRIVER), DriverController.accept);
router.patch('/:id/status', checkAuth, allowRoles(UserRole.DRIVER), DriverController.updateStatus);
router.patch('/me/availability', checkAuth, allowRoles(UserRole.DRIVER), DriverController.setAvailability);
router.get('/me/earnings', checkAuth, allowRoles(UserRole.DRIVER), DriverController.earnings);
export default router;