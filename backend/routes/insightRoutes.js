import express from 'express';
import { getSubscriptions, addSubscription } from '../controllers/insightController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.route('/subscriptions')
  .get(verifyToken, getSubscriptions)
  .post(verifyToken, addSubscription);

export default router;
