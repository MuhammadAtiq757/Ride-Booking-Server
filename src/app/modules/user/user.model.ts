import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'rider', 'driver'], default: 'rider' },
  isBlocked: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  availability: { type: Boolean, default: false },
});

export const User = mongoose.model('User', userSchema);
