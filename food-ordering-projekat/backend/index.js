import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import userRouter from './routes/user.routes.js';
import customerRouter from './routes/customer.routes.js';
import restaurantRouter from './routes/restaurant.routes.js';
import dishRouter from './routes/dish.routes.js';
import orderRouter from './routes/order.routes.js';

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get('/api', (req, res) => {
  res.status(200).send('Server up and running');
});

app.use('/api/users', userRouter);
app.use('/api/customers', customerRouter);
app.use('/api/restaurants', restaurantRouter);
app.use('/api/dishes', dishRouter);
app.use('/api/orders', orderRouter);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.log('Error connecting to MongoDB: ' + e));

app.listen(port, () => {
  console.log('Server is running on port 8000');
});
