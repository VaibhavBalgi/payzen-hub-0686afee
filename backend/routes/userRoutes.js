import express from 'express';
import {
  getCurrentUser,
  updateUserProfile,
  getUserById,
  getAllUsers,
  deleteUser,
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * User Routes
 * Most routes require JWT authentication
 */

// Get current logged-in user profile (protected)
router.get('/profile', verifyToken, getCurrentUser);

// Update user profile (protected)
router.put('/profile', verifyToken, updateUserProfile);

// Get user by ID (protected)
router.get('/:id', verifyToken, getUserById);

// Get all users (protected - admin function)
router.get('/', verifyToken, getAllUsers);

// Delete user (protected - admin function)
router.delete('/:id', verifyToken, deleteUser);

export default router;
