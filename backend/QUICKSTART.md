# Backend Quick Start Guide

Get the PayZen Hub backend running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Configure Environment

```bash
# Copy the example .env file
cp .env.example .env

# Edit .env with your settings (minimal for development):
# MONGODB_URI=mongodb://localhost:27017/payzen-hub
# JWT_SECRET=your-secret-key
```

## Step 3: Start MongoDB

**Local MongoDB:**
```bash
# macOS
brew services start mongodb-community

# Windows - Open Services and start MongoDB
# Or run: mongod
```

**Or use MongoDB Atlas (Cloud):**
- Create account at https://www.mongodb.com
- Create cluster and get connection string
- Update MONGODB_URI in .env

## Step 4: Start the Server

```bash
npm run dev
```

Expected output:
```
✅ Server is running on port 5000
✅ MongoDB Connected: localhost
```

## Step 5: Test the API

### Test Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "123456",
    "passwordConfirm": "123456"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

Save the returned `token` and use it for protected routes.

### Test Protected Route
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Common Issues

### MongoDB Connection Failed
- [ ] Is MongoDB running?
- [ ] Check MONGODB_URI in .env
- [ ] For Atlas: verify network access and connection string

### Port 5000 Already in Use
- [ ] Change PORT in .env
- [ ] Or kill process: `lsof -i :5000` (macOS) then `kill <PID>`

### Module Not Found
- [ ] Run `npm install` again
- [ ] Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## Next Steps

1. **Connect Frontend**: Update `FRONTEND_URL` in .env
2. **Add More Features**: Use `/controllers` and `/routes` structure
3. **Database**: Check MongoDB for stored users
4. **Production**: See README.md for production checklist

## API Documentation

See `README.md` for complete API endpoint documentation.

## Need Help?

Check server logs for error messages. All errors are logged to console in development mode.
