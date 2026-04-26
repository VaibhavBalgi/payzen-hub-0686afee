import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  merchant: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default: "💸",
  },
  raw: {
    type: String,
  },
  category: {
    type: String,
    default: "Other",
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  bank: {
    type: String,
    default: "Bank",
  },
  app: {
    type: String,
    default: "App",
  },
  status: {
    type: String,
    enum: ['Success', 'Pending', 'Flagged'],
    default: 'Success',
  },
  source: {
    type: String,
    enum: ['App', 'Bank/CSV', 'Razorpay'],
    default: 'App',
  },
  paymentMethod: {
    type: String,
  },
  razorpayPaymentId: {
    type: String,
  },
  razorpayOrderId: {
    type: String,
  }
}, {
  timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
