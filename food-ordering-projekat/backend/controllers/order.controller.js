import { Order } from '../models/Order.model.js';
import { Restaurant } from '../models/Restaurant.model.js';
import { Customer } from '../models/Customer.model.js';

/**
 * @route   POST /api/orders
 * @desc    Creates an order
 * @access  Customer
 * @param   {string} req.body.restaurant - Restaurant's id
 * @param   {object[]} req.body.dishes - Dishes
 * @param   {number} req.body.totalPrice - Total price of order
 * @param   {number} req.body.minutesToDeliver - Minutes to deliver the order
 */
export const createOrder = async (req, res) => {
  const { restaurant, dishes, totalPrice, minutesToDeliver } = req.body;

  try {
    const foundRestaurant = await Restaurant.findById(restaurant);
    if (!foundRestaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    const customer = await Customer.findOne({ user: req.userId });
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    if (totalPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid total price',
      });
    }

    const order = new Order({
      restaurant,
      customer: customer._id,
      dishes,
      totalPrice,
      minutesToDeliver,
      status: 'pending-confirm',
    });
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/orders/:id/customer
 * @desc    Get orders by customer
 * @access  Private
 * @param   {string} req.params.id - Customer's id
 */
export const getCustomersOrders = async (req, res) => {
  const { id } = req.params;

  try {
    const orders = await Order.find({ customer: id })
      .populate({
        path: 'customer',
        populate: {
          path: 'user',
          select: '-password',
        },
      })
      .populate({
        path: 'restaurant',
        populate: {
          path: 'user',
          select: '-password',
        },
      })
      .populate({
        path: 'dishes.dish',
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/orders/:id/restaurant
 * @desc    Get orders by restaurant
 * @access  Private
 * @param   {string} req.params.id - Restaurants's id
 */
export const getRestaurantsOrders = async (req, res) => {
  const { id } = req.params;

  try {
    const orders = await Order.find({ restaurant: id })
      .populate({
        path: 'customer',
        populate: {
          path: 'user',
          select: '-password',
        },
      })
      .populate({
        path: 'restaurant',
        populate: {
          path: 'user',
          select: '-password',
        },
      })
      .populate({
        path: 'dishes.dish',
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};