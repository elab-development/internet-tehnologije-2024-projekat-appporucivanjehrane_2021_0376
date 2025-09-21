import express from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  getVerifiedRestaurants,
  loginRestaurant,
  registerRestaurant,
  verifyRestaurantAddCommission,
} from '../controllers/restaurant.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.js';

const router = express.Router();

router.post('/register', registerRestaurant);
router.post('/login', loginRestaurant);

router.get('/', verifyToken, verifyAdmin, getAllRestaurants);
router.get('/verified', getVerifiedRestaurants);
router.get('/:id', getRestaurantById);

router.put(
  '/:id/verify',
  verifyToken,
  verifyAdmin,
  verifyRestaurantAddCommission
);

export default router;
