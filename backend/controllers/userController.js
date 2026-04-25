import User from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Get current logged-in user profile
 * GET /api/users/profile
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new AppError('User ID not found in request', 401);
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 * PUT /api/users/profile
 */
export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { name, phone, avatar } = req.body;

    if (!userId) {
      throw new AppError('User ID not found in request', 401);
    }

    // Find user and update
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Update allowed fields only
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (avatar !== undefined) user.avatar = avatar;

    // Save updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user by ID (admin function)
 * GET /api/users/:id
 */
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all users (admin function)
 * GET /api/users
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      count: users.length,
      users: users.map((user) => user.toJSON()),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user (admin function)
 * DELETE /api/users/:id
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
