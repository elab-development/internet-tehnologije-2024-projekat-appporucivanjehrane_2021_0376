import express from 'express';
import {
  loginRestaurant,
  registerRestaurant,
} from '../controllers/restaurant.controller.js';

const router = express.Router();

router.post('/register', registerRestaurant);
router.post('/login', loginRestaurant);

export default router;