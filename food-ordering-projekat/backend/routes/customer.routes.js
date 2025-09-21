import express from 'express';
import {
  getAllCustomers,
  loginCustomer,
  registerCustomer,
} from '../controllers/customer.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.js';

const router = express.Router();

router.post('/register', registerCustomer);
router.post('/login', loginCustomer);

router.get('/', verifyToken, verifyAdmin, getAllCustomers);

export default router;
