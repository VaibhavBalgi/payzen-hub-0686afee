import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Generate final JWT token (full session)
 */
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

/**
 * Generate a short-lived pre-auth (MFA pending) token.
 * Cannot be used to access protected routes — verifyToken requires { userId } only.
 */
const generatePreAuthToken = (userId) => {
  return jwt.sign(
    { sub: userId, purpose: 'mfa' },
    process.env.JWT_SECRET,
    { expiresIn: '10m' }
  );
};

// In-memory OTP store: { [userId]: { codeHash, expiresAt, attempts } }
// For multi-instance deployments, swap this for Redis.
const otpStore = new Map();
const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const hashOtp = (code, userId) =>
  crypto.createHash('sha256').update(`${userId}:${code}`).digest('hex');

const issueOtp = (userId) => {
  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
  otpStore.set(String(userId), {
    codeHash: hashOtp(code, userId),
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  });
  // In production this should be sent via SMS/email provider.
  console.log(`[auth] OTP for user ${userId}: ${code}`);
  return code;
};

/**
 * Register a new user — does NOT issue session token; requires OTP verification.
 * POST /api/auth/register
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    if (!name || !email || !password || !passwordConfirm) {
      throw new AppError('Please provide all required fields', 400);
    }
    if (password !== passwordConfirm) {
      throw new AppError('Passwords do not match', 400);
    }
    if (password.length < 6) {
      throw new AppError('Password must be at least 6 characters', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    const newUser = await User.create({ name, email, password });

    const preAuthToken = generatePreAuthToken(newUser._id);
    const otp = issueOtp(newUser._id);

    res.status(201).json({
      success: true,
      message: 'User registered. OTP required to complete sign-in.',
      otpRequired: true,
      preAuthToken,
      // Demo only: surface OTP outside production so the UX can show it.
      ...(process.env.NODE_ENV !== 'production' ? { devOtp: otp } : {}),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user — does NOT issue session token; requires OTP verification.
 * POST /api/auth/login
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    const preAuthToken = generatePreAuthToken(user._id);
    const otp = issueOtp(user._id);

    res.status(200).json({
      success: true,
      message: 'Credentials accepted. OTP required to complete sign-in.',
      otpRequired: true,
      preAuthToken,
      ...(process.env.NODE_ENV !== 'production' ? { devOtp: otp } : {}),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify OTP against server-stored value and issue the real session token.
 * POST /api/auth/otp/verify
 * Body: { preAuthToken, otp }
 */
export const verifyOtp = async (req, res, next) => {
  try {
    const { preAuthToken, otp } = req.body;
    if (!preAuthToken || !otp) {
      throw new AppError('preAuthToken and otp are required', 400);
    }
    if (!/^\d{6}$/.test(String(otp))) {
      throw new AppError('OTP must be 6 digits', 400);
    }

    let decoded;
    try {
      decoded = jwt.verify(preAuthToken, process.env.JWT_SECRET);
    } catch {
      throw new AppError('Invalid or expired pre-auth token', 401);
    }
    if (decoded.purpose !== 'mfa' || !decoded.sub) {
      throw new AppError('Invalid pre-auth token', 401);
    }

    const userId = String(decoded.sub);
    const entry = otpStore.get(userId);
    if (!entry) {
      throw new AppError('No active OTP. Please request a new one.', 401);
    }
    if (Date.now() > entry.expiresAt) {
      otpStore.delete(userId);
      throw new AppError('OTP expired. Please request a new one.', 401);
    }
    if (entry.attempts >= MAX_ATTEMPTS) {
      otpStore.delete(userId);
      throw new AppError('Too many invalid attempts. Please log in again.', 429);
    }

    const submittedHash = hashOtp(String(otp), userId);
    const expected = Buffer.from(entry.codeHash, 'hex');
    const submitted = Buffer.from(submittedHash, 'hex');
    const valid =
      expected.length === submitted.length &&
      crypto.timingSafeEqual(expected, submitted);

    if (!valid) {
      entry.attempts += 1;
      throw new AppError('Invalid OTP', 401);
    }

    otpStore.delete(userId);

    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      message: 'OTP verified',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify token (existing session)
 * POST /api/auth/verify
 */
export const verifyAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new AppError('No token provided', 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) throw new AppError('User not found', 404);

    res.status(200).json({
      success: true,
      message: 'Token is valid',
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user
 * POST /api/auth/logout
 */
export const logoutUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};
