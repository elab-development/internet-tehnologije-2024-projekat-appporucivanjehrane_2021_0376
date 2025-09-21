import express from 'express';
import {
  createOrder,
  getCustomersOrders,
  getRestaurantsOrders,
} from '../controllers/order.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { verifyCustomer } from '../middlewares/verifyCustomer.js';

const router = express.Router();

router.post('/', verifyToken, verifyCustomer, createOrder);

router.get('/:id/customer', verifyToken, getCustomersOrders);
router.get('/:id/restaurant', verifyToken, getRestaurantsOrders);

export default router;