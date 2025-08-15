import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { UserRole } from '../../interfaces/common';
import { AdminController } from './admin.controller';
import { allowRoles } from '../../middlewares/auth';


const router = Router();
router.use(checkAuth, allowRoles(UserRole.ADMIN));
router.get('/users', AdminController.listUsers);
router.get('/rides', AdminController.listRides);
router.patch('/drivers/approve/:id', AdminController.approveDriver);
router.patch('/drivers/suspend/:id', AdminController.suspendDriver);
router.patch('/users/block/:id', AdminController.blockUser);
router.patch('/users/unblock/:id', AdminController.unblockUser);
export default router;