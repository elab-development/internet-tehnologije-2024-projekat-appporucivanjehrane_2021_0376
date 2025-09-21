import { User } from '../models/User.model.js';

export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - no user found',
      });
    }

    if (user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - not admin',
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
