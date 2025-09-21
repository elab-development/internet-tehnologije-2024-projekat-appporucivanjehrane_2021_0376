import bcryptjs from 'bcryptjs';
import { User } from '../models/User.model.js';
import { Customer } from '../models/Customer.model.js';
import { generateTokenAndSetCookie } from '../lib/authToken.js';

/**
 * @route   POST /api/customers/register
 * @desc    Registers a new customer user and generates a token
 * @access  Public
 * @param   {string} req.body.email - User's email address
 * @param   {string} req.body.password - User's password
 * @param   {string} req.body.firstName - User's first name
 * @param   {string} req.body.lastName - User's last name
 */
export const registerCustomer = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    if (!email || !password || !firstName || !lastName) {
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
      role: 'customer',
    });
    await user.save();

    const customerExists = await Customer.findOne({
      user: user._id,
    });
    if (customerExists) {
      return res.status(400).json({
        success: false,
        message: 'Customer already exists',
      });
    }

    const customer = new Customer({
      firstName,
      lastName,
      user: user._id,
    });
    await customer.save();

    generateTokenAndSetCookie(res, user._id);

    const fullCustomer = await Customer.findOne({ user: user._id }).populate(
      'user',
      '-password'
    );

    res.status(201).json({
      success: true,
      message: 'Customer signed up successfully',
      customer: fullCustomer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   POST /api/users/login
 * @desc    Logins in customer user and generates a token
 * @access  Public
 * @param   {string} req.body.email - User's email address
 * @param   {string} req.body.password - User's password
 */
export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, role: 'customer' });
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

    const customer = await Customer.findOne({ user: user._id }).populate(
      'user',
      '-password'
    );

    res.status(200).json({
      success: true,
      message: 'Customer logged in successfully',
      customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/customers
 * @desc    Fetches all the customers
 * @access  Admin
 */
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({})
      .populate('user', '-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
