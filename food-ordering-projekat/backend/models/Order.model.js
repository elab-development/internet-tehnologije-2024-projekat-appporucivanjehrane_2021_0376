import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    dishes: [
      {
        dish: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Dish',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        'pending-confirm',
        'pending-make',
        'pending-delivery',
        'completed',
        'canceled',
      ],
      default: 'pending-confirm',
    },
    minutesToPrepare: {
      type: Number,
      default: 0,
    },
    minutesToDeliver: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', OrderSchema);
