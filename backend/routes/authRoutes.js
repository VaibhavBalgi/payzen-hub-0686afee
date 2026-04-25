import express from 'express';
import {
  registerUser,
  loginUser,
  verifyAuth,
  logoutUser,
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * Auth Routes
 */

// Register new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Verify token (protected route)
router.post('/verify', verifyToken, verifyAuth);

// Logout user
router.post('/logout', verifyToken, logoutUser);

export default router;
