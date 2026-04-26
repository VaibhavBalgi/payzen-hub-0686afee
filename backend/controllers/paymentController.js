import Razorpay from 'razorpay';
import crypto from 'crypto';
import Transaction from '../models/Transaction.js';

// Since this is a demo, we will use hardcoded generic Razorpay test keys if none are provided in env
const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_T1z6ZTk3y8y7oR',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'b75E0u8dF6Z9n9X3b7x8u2q5'
});

// @desc    Create a Razorpay order
// @route   POST /api/payments/create-order
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;
    
    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}_${req.userId}`
    };

    const order = await rzp.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: rzp.key_id
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify payment and save transaction
// @route   POST /api/payments/verify
// @access  Private
export const verifyPayment = async (req, res, next) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      amount,
      merchant,
      category
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', rzp.key_secret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Fetch actual payment method from Razorpay
    let paymentMethod = 'Unknown';
    try {
      const paymentDetails = await rzp.payments.fetch(razorpay_payment_id);
      paymentMethod = paymentDetails.method || 'Unknown'; // e.g., 'upi', 'card', 'netbanking'
    } catch (e) {
      console.error("Failed to fetch payment details from Razorpay", e);
    }

    // Save transaction
    const newTransaction = await Transaction.create({
      user: req.userId,
      merchant: merchant || 'Razorpay Demo',
      amount: -(amount), // Negative to denote payment/expense
      date: new Date(),
      category: category || 'Other',
      bank: 'Razorpay',
      app: 'Razorpay Checkout',
      status: 'Success',
      source: 'Razorpay',
      paymentMethod: paymentMethod,
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      raw: `razorpay_${paymentMethod}_${razorpay_payment_id}`
    });

    res.status(200).json({
      success: true,
      message: 'Payment verified and transaction saved successfully',
      transaction: newTransaction
    });
  } catch (error) {
    next(error);
  }
};
