/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

/**
 * User Roles
 */
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  // Auth errors
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'Email already registered',
  USER_NOT_FOUND: 'User not found',
  UNAUTHORIZED: 'Please login to access this resource',
  TOKEN_EXPIRED: 'Token has expired. Please login again',
  INVALID_TOKEN: 'Invalid token. Please login again',

  // Validation errors
  MISSING_FIELDS: 'Please provide all required fields',
  INVALID_EMAIL: 'Please provide a valid email',
  INVALID_PASSWORD: 'Password must be at least 6 characters',
  PASSWORD_MISMATCH: 'Passwords do not match',

  // Server errors
  SERVER_ERROR: 'Internal server error',
  DATABASE_ERROR: 'Database operation failed',
};

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: 'User registered successfully',
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PROFILE_FETCHED: 'User profile retrieved successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  USER_DELETED: 'User deleted successfully',
};

/**
 * JWT Configuration
 */
export const JWT_CONFIG = {
  EXPIRATION: process.env.JWT_EXPIRE || '7d',
};
