import bcryptjs from 'bcryptjs';
import { User } from '../models/User.model.js';
import { Restaurant } from '../models/Restaurant.model.js';
import { Order } from '../models/Order.model.js';
import { generateTokenAndSetCookie } from '../lib/authToken.js';

/**
 * @route   POST /api/restaurants/register
 * @desc    Registers a new restaurant user and generates a token
 * @access  Public
 * @param   {string} req.body.email - Restaurant's email address
 * @param   {string} req.body.password - Restaurant's password
 * @param   {string} req.body.name - Restaurant's name
 */
export const registerRestaurant = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error('Fill all the required fields');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      profileImage: 'https://cdn-icons-png.flaticon.com/512/10309/10309202.png',
      role: 'restaurant',
    });
    await user.save();

    const restaurant = new Restaurant({
      name,
      user: user._id,
    });
    await restaurant.save();

    generateTokenAndSetCookie(res, user._id);

    const fullRestaurant = await Restaurant.findOne({
      user: user._id,
    }).populate('user', '-password');

    res.status(201).json({
      success: true,
      message: 'Restaurant signed up successfully',
      restaurant: fullRestaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   POST /api/restaurants/login
 * @desc    Logins in restaurant user and generates a token
 * @access  Public
 * @param   {string} req.body.email - Restaurant's email address
 * @param   {string} req.body.password - Restaurant's password
 */
export const loginRestaurant = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, role: 'restaurant' });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Wrong credentials',
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Wrong credentials',
      });
    }

    generateTokenAndSetCookie(res, user._id);

    const restaurant = await Restaurant.findOne({ user: user._id }).populate(
      'user',
      '-password'
    );

    res.status(200).json({
      success: true,
      message: 'Restaurant logged in successfully',
      restaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/restaurants
 * @desc    Fetches all the restaurants
 * @access  Admin
 */
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({})
      .populate('user', '-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      restaurants,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/restaurants/verified
 * @desc    Fetches verified restaurants
 * @access  Public
 * * @param   {string} req.query.sort - Sort by
 * @param   {string} req.query.search - Search query
 */
export const getVerifiedRestaurants = async (req, res) => {
  try {
    const { sort, search } = req.query;

    const searchFilter = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
            { address: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    let restaurants = await Restaurant.find({
      verified: true,
      ...searchFilter,
    }).populate('user', '-password');

    const restaurantsWithOrders = await Promise.all(
      restaurants.map(async (restaurant) => {
        const totalOrders = await Order.countDocuments({
          restaurant: restaurant._id,
        });
        return {
          ...restaurant.toObject(),
          totalOrders,
        };
      })
    );

    if (sort === 'name') {
      restaurantsWithOrders.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'orders') {
      restaurantsWithOrders.sort((a, b) => b.totalOrders - a.totalOrders);
    } else {
      restaurantsWithOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    res.status(200).json({
      success: true,
      restaurants: restaurantsWithOrders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/restaurants/:id
 * @desc    Fetches restaurant by id
 * @access  Public
 * @param   {string} req.params.id - Restaurant's id
 */
export const getRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findById(id)
      .populate('user', '-password')
      .sort({ createdAt: -1 });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/restaurants/:id/verify
 * @desc    Verifies the restaurant and adds the platform commission
 * @access  Admin
 * @param   {string} req.params.id - Restaurant's id
 * @param   {number} req.body.commission - Platform's commission
 */
export const verifyRestaurantAddCommission = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    if (req.body.commission > 0) {
      restaurant.verified = true;
      restaurant.commission = req.body.commission;
      await restaurant.save();
    } else {
      return res.status(400).json({
        success: false,
        message: 'Commission must be greater than 0',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Restaurant verified successfully!',
      restaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
