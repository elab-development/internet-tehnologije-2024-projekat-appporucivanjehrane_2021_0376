import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/2544/2544054.png',
    },
    role: {
      type: String,
      enum: ['admin', 'restaurant', 'customer'],
      default: 'customer',
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);