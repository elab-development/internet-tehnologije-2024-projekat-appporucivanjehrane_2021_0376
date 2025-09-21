import { User } from '../models/User.model.js';

export const verifyCustomer = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - no user found',
      });
    }

    if (user.role !== 'customer') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - not customer',
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};