import express from 'express';
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats
} from '../controllers/transactionController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(verifyToken, getTransactions)
  .post(verifyToken, addTransaction);

router.route('/stats')
  .get(verifyToken, getTransactionStats);

router.route('/:id')
  .put(verifyToken, updateTransaction)
  .delete(verifyToken, deleteTransaction);

export default router;
