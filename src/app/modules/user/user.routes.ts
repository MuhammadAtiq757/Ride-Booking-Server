import express from 'express';

import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from './user.interface';
import { usersConterller } from './user.controller';

const router = express.Router();

router.get('/all-users', checkAuth(Role.ADMIN), usersConterller.getAllUsers);

export const UserRoutes = router;