import { Order } from '../models/Order.model.js';
import { Restaurant } from '../models/Restaurant.model.js';
import { Customer } from '../models/Customer.model.js';
import { User } from '../models/User.model.js';

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
 * 
 * 
 * /**
 * @route   GET /api/orders
 * @desc    Get orders by customer
 * @access  Admin
 
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
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

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by id
 * @access  Private
 * @param   {string} req.params.id - Order's id
 */
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id)
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
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
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
 * @route   PUT /api/orders/:id/update-status
 * @desc    Update order status
 * @access  Restaurant
 * @param   {string} req.params.id - Order's id
 * @param   {string} req.body.status - Order status
 * @param   {number} req.body.minutesToPrepare - Minutes to prepare order
 */
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    const ordersRestaurant = await Restaurant.findById(order.restaurant);
    if (!ordersRestaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }
    const loggedInRestaurant = await Restaurant.findOne({ user: req.userId });
    if (!loggedInRestaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    if (ordersRestaurant._id.toString() !== loggedInRestaurant._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to update this orders status',
      });
    }

    if (!status) {
      throw new Error('Status not provided');
    }

    let updatedOrder;
    // PENDING-MAKE
    if (status === 'pending-make') {
      updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
          $set: {
            minutesToPrepare: req.body.minutesToPrepare,
            status: 'pending-make',
          },
        },
        { new: true }
      )
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
        });
    }

    // PENDING-DELIVERY OR CANCELLED
    if (status === 'pending-delivery' || status === 'cancelled') {
      updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
          $set: {
            status,
          },
        },
        { new: true }
      )
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
        });
    }

    // COMPLETE
    if (status === 'completed') {
      updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
          $set: {
            status,
          },
        },
        { new: true }
      )
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
        });

      // Update users balances
      const customerSpending = order.totalPrice;
      const commissionAmount =
        (order.totalPrice * ordersRestaurant.commission) / 100;
      const restaurantEarning = customerSpending - commissionAmount;

      // Customer
      const ordersCustomer = await Customer.findById(order.customer);
      await User.findByIdAndUpdate(
        ordersCustomer.user,
        {
          $inc: { balance: +customerSpending },
        },
        { new: true }
      );

      // Restaurant
      await User.findByIdAndUpdate(
        req.userId,
        {
          $inc: { balance: +restaurantEarning },
        },
        { new: true }
      );

      // Admin
      await User.findOneAndUpdate(
        {
          role: 'admin',
        },
        {
          $inc: { balance: +commissionAmount },
        },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
