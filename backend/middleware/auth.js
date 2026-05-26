import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware to require admin role. Must run after verifyToken.
 */
export const isAdmin = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    const user = await User.findById(req.userId).select('role');
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden: admin access required' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Authorization check failed' });
  }
};

/**
 * Middleware to verify JWT token and protect routes
 */
export const verifyToken = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login first.',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to request object
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Token verification failed',
      error: error.message,
    });
  }
};
