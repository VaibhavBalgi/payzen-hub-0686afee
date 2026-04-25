import Subscription from '../models/Subscription.js';

// @desc    Get subscriptions
// @route   GET /api/insights/subscriptions
// @access  Private
export const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ user: req.userId });
    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a subscription
// @route   POST /api/insights/subscriptions
// @access  Private
export const addSubscription = async (req, res, next) => {
  try {
    req.body.user = req.userId;
    const subscription = await Subscription.create(req.body);
    
    res.status(201).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    next(error);
  }
};
