import express from 'express';
import {
  getCurrentUser,
  updateUserProfile,
  getUserById,
  getAllUsers,
  deleteUser,
} from '../controllers/userController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

/**
 * User Routes
 */

// Get current logged-in user profile (protected)
router.get('/profile', verifyToken, getCurrentUser);

// Update user profile (protected)
router.put('/profile', verifyToken, updateUserProfile);

// Admin-only: list all users
router.get('/', verifyToken, isAdmin, getAllUsers);

// Admin-only: get a user by ID
router.get('/:id', verifyToken, isAdmin, getUserById);

// Admin-only: delete a user
router.delete('/:id', verifyToken, isAdmin, deleteUser);

export default router;
