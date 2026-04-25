import Transaction from '../models/Transaction.js';

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.userId }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a transaction
// @route   POST /api/transactions
// @access  Private
export const addTransaction = async (req, res, next) => {
  try {
    req.body.user = req.userId;
    const transaction = await Transaction.create(req.body);
    
    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (req, res, next) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.userId.toString()) {
      return res.status(401).json({ success: false, error: 'Not authorized to update this transaction' });
    }

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.userId.toString()) {
      return res.status(401).json({ success: false, error: 'Not authorized to delete this transaction' });
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get transaction stats (for dashboard charts)
// @route   GET /api/transactions/stats
// @access  Private
export const getTransactionStats = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.userId });
    
    // Calculate total spend (negative amounts)
    const totalSpend = transactions
      .filter(t => t.amount < 0)
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    // Calculate category spend
    const categorySpendMap = {};
    transactions.forEach(t => {
      if (t.amount < 0) {
        categorySpendMap[t.category] = (categorySpendMap[t.category] || 0) + Math.abs(t.amount);
      }
    });

    const categorySpend = Object.keys(categorySpendMap).map(category => ({
      name: category,
      value: categorySpendMap[category]
    })).sort((a, b) => b.value - a.value);

    // Provide some dummy weekly data based on real total for simplicity, 
    // or calculate correctly if we have dates
    
    res.status(200).json({
      success: true,
      data: {
        totalSpend,
        categorySpend
      }
    });
  } catch (error) {
    next(error);
  }
};
