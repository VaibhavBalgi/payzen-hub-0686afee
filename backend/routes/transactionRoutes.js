import express from 'express';
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats,
  syncMockTransactions,
  importCsvTransactions
} from '../controllers/transactionController.js';
import { verifyToken } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.TEMP || '/tmp')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage: storage });

const router = express.Router();

router.route('/')
  .get(verifyToken, getTransactions)
  .post(verifyToken, addTransaction);

router.post('/sync', verifyToken, syncMockTransactions);
router.post('/import-csv', verifyToken, upload.single('file'), importCsvTransactions);

router.route('/stats')
  .get(verifyToken, getTransactionStats);

router.route('/:id')
  .put(verifyToken, updateTransaction)
  .delete(verifyToken, deleteTransaction);

export default router;
