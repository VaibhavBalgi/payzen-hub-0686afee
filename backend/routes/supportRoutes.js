import express from 'express';
import { escalateTransaction } from '../controllers/supportController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// All support routes require authentication
router.use(verifyToken);

router.post('/escalate', escalateTransaction);

export default router;
