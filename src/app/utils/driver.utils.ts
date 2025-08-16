// driver.utils.ts

import { DriverStatus, UserRole } from '../interfaces/common';
import { User } from '../modules/user/user.model';

export const ensureDriverProfile = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (user.role === UserRole.DRIVER && !user.driver) {
    user.driver = {
      status: DriverStatus.PENDING,
      isAvailable: false,
      earnings: 0,
    };
    await user.save();
  }
};
