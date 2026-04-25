# PayZen Hub Backend API

A complete Node.js/Express backend for the PayZen Hub full-stack application with MongoDB, JWT authentication, and secure password handling.

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── authController.js    # Authentication logic (register, login)
│   └── userController.js    # User profile management
├── middleware/
│   ├── auth.js              # JWT verification middleware
│   └── errorHandler.js      # Global error handling
├── models/
│   └── User.js              # User schema and methods
├── routes/
│   ├── authRoutes.js        # Authentication endpoints
│   └── userRoutes.js        # User endpoints
├── server.js                # Main entry point
├── package.json             # Dependencies and scripts
└── .env.example             # Environment variables template
```

## Setup Instructions

### 1. Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### 2. Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 3. Environment Configuration

```bash
# Create .env file from example
cp .env.example .env

# Edit .env with your configuration
```

Update `.env` with your values:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/payzen-hub
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/payzen-hub

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:5173
```

### 4. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally and start the service
# On macOS with Homebrew:
brew services start mongodb-community

# On Windows:
# Start MongoDB from Services or Command Prompt
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com](https://www.mongodb.com)
2. Create a cluster
3. Get connection string and update `MONGODB_URI` in `.env`

### 5. Start the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

Expected output:
```
✅ Server is running on port 5000
Environment: development
✅ MongoDB Connected: localhost
```

## API Endpoints

### Authentication Routes `/api/auth`

#### Register User
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Verify Token
```
POST /api/auth/verify
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Token is valid",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Logout
```
POST /api/auth/logout
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

### User Routes `/api/users`

All user routes require JWT authentication via `Authorization: Bearer <token>` header

#### Get Current User Profile
```
GET /api/users/profile
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "User profile retrieved successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": null,
    "avatar": null,
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Update User Profile
```
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "name": "John Updated",
  "phone": "+1234567890",
  "avatar": "https://example.com/avatar.jpg"
}

Response (200):
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "john@example.com",
    "phone": "+1234567890",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

#### Get User by ID
```
GET /api/users/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "User retrieved successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get All Users
```
GET /api/users
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Users retrieved successfully",
  "count": 5,
  "users": [...]
}
```

#### Delete User
```
DELETE /api/users/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "User deleted successfully"
}
```

### Health Check
```
GET /api/health

Response (200):
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Security Features

✅ **Password Security**
- Passwords hashed using bcrypt with salt (cost factor: 10)
- Never stored or returned in plaintext
- Salted hash prevents rainbow table attacks

✅ **JWT Authentication**
- Industry-standard JWT tokens
- Configurable expiration (default: 7 days)
- Token verification on protected routes
- Secure secret key management via environment variables

✅ **CORS Protection**
- Configured to accept requests from frontend only
- Credentials enabled for secure cookie/header handling

✅ **Input Validation**
- Email format validation
- Password confirmation check
- Required field validation
- Email uniqueness enforcement

✅ **Error Handling**
- Comprehensive error messages
- Proper HTTP status codes
- No sensitive information in error responses
- Stack traces only in development mode

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/payzen-hub` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `JWT_SECRET` | Secret key for JWT signing | Required |
| `JWT_EXPIRE` | Token expiration time | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **dotenv**: Environment variables
- **cors**: Cross-origin resource sharing
- **nodemon** (dev): Auto-reload during development

## Development

### Debugging

Add `console.log()` statements or use a debugger. The error handling middleware logs all errors to console in development mode.

### Adding New Routes

1. Create controller in `controllers/`
2. Create route in `routes/`
3. Import and use in `server.js`

### Modifying User Schema

Edit `models/User.js` and add validation as needed.

## Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456","passwordConfirm":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

### Using Postman

1. Import the API endpoints
2. Set `Authorization` header type to `Bearer Token`
3. Paste the token from login/register response
4. Test protected routes

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network access (for Atlas)

### Token Expired
- Tokens expire after the duration set in `JWT_EXPIRE`
- User needs to login again to get a new token

### CORS Error
- Ensure `FRONTEND_URL` matches your frontend's URL
- Verify `credentials: true` is set in CORS middleware

### Port Already in Use
- Change `PORT` in `.env`
- Or kill process using the port

## Production Checklist

- [ ] Change `NODE_ENV` to `production`
- [ ] Use strong, random `JWT_SECRET`
- [ ] Use MongoDB Atlas instead of local MongoDB
- [ ] Enable HTTPS/SSL
- [ ] Set proper CORS origins
- [ ] Remove console.logs in production
- [ ] Enable rate limiting
- [ ] Add request validation
- [ ] Set up logging service
- [ ] Configure backup strategy

## License

ISC

## Support

For issues or questions, please create an issue in the repository.
