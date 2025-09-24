import express from 'express';
import {
  createOrder,
  getAllOrders,
  getCustomersOrders,
  getOrderById,
  getRestaurantsOrders,
  updateOrderStatus,
} from '../controllers/order.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { verifyCustomer } from '../middlewares/verifyCustomer.js';
import { verifyRestaurant } from '../middlewares/verifyRestaurant.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.js';

const router = express.Router();

router.post('/', verifyToken, verifyCustomer, createOrder);

router.get('/', verifyToken, verifyAdmin, getAllOrders);
router.get('/:id/customer', verifyToken, getCustomersOrders);
router.get('/:id/restaurant', verifyToken, getRestaurantsOrders);
router.get('/:id', verifyToken, getOrderById);

router.put(
  '/:id/update-status',
  verifyToken,
  verifyRestaurant,
  updateOrderStatus
);

export default router;
