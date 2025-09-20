import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: { type: String },
    category: { type: String },
    phone: { type: String },
    address: { type: String },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    verified: {
      type: Boolean,
      default: false,
    },
    commission: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model('Restaurant', RestaurantSchema);