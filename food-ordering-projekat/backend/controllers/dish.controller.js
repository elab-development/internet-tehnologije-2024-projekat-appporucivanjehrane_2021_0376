import { v2 as cloudinary } from 'cloudinary';

import { Dish } from '../models/Dish.model.js';
import { Restaurant } from '../models/Restaurant.model.js';

/**
 * @route   POST /api/dishes
 * @desc    Creates a new dish for logged in restaurant
 * @access  Restaurant
 * @param   {string} req.body.name - Dish's name
 * @param   {string} req.body.description - Dish's description
 * @param   {string} req.body.price - Dish's price
 * @param   {file} req.file - Dish's image
 */
export const createDish = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    if (!name || !price) {
      throw new Error('Fill all the required fields');
    }

    const restaurant = await Restaurant.findOne({
      user: req.userId,
    });
    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    const dishExists = await Dish.findOne({
      name: name,
      restaurant: restaurant._id,
    });
    if (dishExists) {
      return res.status(400).json({
        success: false,
        message: 'Dish with this name already exists',
      });
    }

    const dish = new Dish({
      restaurant: restaurant._id,
      name,
      description,
      price,
    });

    let photo = '';
    if (req.file) {
      let uploadedFile;
      try {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: 'aFood/Dishes',
          resource_type: 'image',
        });
      } catch (error) {
        res.status(500);
        throw new Error('Something went wrong while uploading the image');
      }

      photo = uploadedFile.secure_url;
    }

    if (photo.length > 0) {
      dish.image = photo;
    }
    await dish.save();

    res.status(201).json({
      success: true,
      message: 'Dish created successfully',
      dish,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/dishes/:id/restaurant
 * @desc    Creates a new dish for logged in restaurant
 * @access  Public
 * @param   {string} req.params.id - Restaurant's _id
 */
export const getRestaurantsDishes = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    const dishes = await Dish.find({ restaurant: id }).populate('restaurant');

    res.status(200).json({
      success: true,
      message: 'Dishes retrieved successfully',
      dishes,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   PUT /api/dishes/:id
 * @desc    Updates the dish
 * @access  Restaurant
 * @param   {string} req.params.id - Dish's _id
 * @param   {string} req.body.name - Dish's name
 * @param   {string} req.body.description - Dish's description
 * @param   {string} req.body.price - Dish's price
 * @param   {file} req.file - Dish's image
 */
export const updateDish = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({
        success: false,
        message: 'Dish not found',
      });
    }

    const restaurant = await Restaurant.findOne({
      user: req.userId,
    });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    if (dish.restaurant.toString() !== restaurant._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to update this dish',
      });
    }

    let photo = '';
    if (req.file) {
      let uploadedFile;
      try {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: 'aFood/Dishes',
          resource_type: 'image',
        });
      } catch (error) {
        res.status(500);
        throw new Error('Something went wrong while uploading the image');
      }

      photo = uploadedFile.secure_url;
    }

    if (photo.length > 0) {
      dish.image = photo;
      await dish.save();
    }

    const updatedDish = await Dish.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          description,
          price,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Dish updated successfully',
      dish: updatedDish,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   DELETE /api/dishes/:id
 * @desc    Delete Dish by id
 * @access  Restaurant
 * @param   {string} req.params.id - Dish's _id
 */
export const deleteDish = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      user: req.userId,
    });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({
        success: false,
        message: 'Dish not found',
      });
    }

    if (dish.restaurant.toString() !== restaurant._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to delete this dish',
      });
    }

    // TODO: Delete forbiden for dishes inside of orders

    await Dish.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Dish deleted successfully',
      resId: restaurant._id,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
