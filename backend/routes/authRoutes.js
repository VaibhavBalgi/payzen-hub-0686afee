import express from 'express';
import {
  registerUser,
  loginUser,
  verifyAuth,
  logoutUser,
  verifyOtp,
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/otp/verify', verifyOtp);
router.post('/verify', verifyToken, verifyAuth);
router.post('/logout', verifyToken, logoutUser);

export default router;
