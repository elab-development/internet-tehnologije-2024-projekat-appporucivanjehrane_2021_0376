import express from 'express';
import {
  createDish,
  deleteDish,
  getRestaurantsDishes,
  updateDish,
} from '../controllers/dish.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { verifyRestaurant } from '../middlewares/verifyRestaurant.js';
import { upload } from '../lib/fileUpload.js';

const router = express.Router();

router.post(
  '/',
  verifyToken,
  verifyRestaurant,
  upload.single('image'),
  createDish
);

router.get('/:id/restaurant', getRestaurantsDishes);

router.put(
  '/:id',
  verifyToken,
  verifyRestaurant,
  upload.single('image'),
  updateDish
);
router.delete('/:id', verifyToken, verifyRestaurant, deleteDish);

export default router;