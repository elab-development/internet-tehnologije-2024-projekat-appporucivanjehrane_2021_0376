import express from 'express';
import {
  checkAuth,
  getAdminData,
  loginAdmin,
  logout,
  updateProfile,
} from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.js';
import { upload } from '../lib/fileUpload.js';

const router = express.Router();

router.post('/logout', verifyToken, logout);
router.get('/check-auth', verifyToken, checkAuth);
router.post('/admin-login', loginAdmin);

router.put(
  '/update-profile',
  verifyToken,
  upload.single('image'),
  updateProfile
);

router.get('/admin-data', verifyToken, verifyAdmin, getAdminData);

export default router;
