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

// @desc    Sync mock transactions from "bank"
// @route   POST /api/transactions/sync
// @access  Private
export const syncMockTransactions = async (req, res, next) => {
  try {
    const existing = await Transaction.countDocuments({ user: req.userId });
    if (existing > 5) {
      return res.status(200).json({ success: true, message: "Already synced" });
    }

    const mockMerchants = [
      { m: "Swiggy", app: "Google Pay", cat: "Food", amt: [-240, -350, -180, -420, -150] },
      { m: "Zomato", app: "PhonePe", cat: "Food", amt: [-290, -450, -120] },
      { m: "Amazon India", app: "ICICI Bank", cat: "Shopping", amt: [-1499, -299, -899] },
      { m: "Uber", app: "Paytm", cat: "Travel", amt: [-150, -320, -210, -450] },
      { m: "Netflix", app: "HDFC Bank", cat: "Subscriptions", amt: [-649] },
      { m: "Jio Recharge", app: "Google Pay", cat: "Bills", amt: [-299, -666] },
      { m: "Tech Solutions Pvt Ltd", app: "HDFC Bank", cat: "Income", amt: [85000, 92000] },
      { m: "Ramesh Kirana", app: "PhonePe", cat: "Merchant", amt: [-45, -120, -85] },
      { m: "Starbucks", app: "CRED", cat: "Food", amt: [-350, -420] }
    ];

    const generateRandomDate = () => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      return date;
    };

    const newTransactions = [];
    for (let i = 0; i < 25; i++) {
      const merch = mockMerchants[Math.floor(Math.random() * mockMerchants.length)];
      const amt = merch.amt[Math.floor(Math.random() * merch.amt.length)];
      
      newTransactions.push({
        user: req.userId,
        merchant: merch.m,
        amount: amt,
        raw: `${merch.m.toLowerCase().replace(/ /g, '')}@upi`,
        category: merch.cat,
        bank: ["HDFC Bank", "ICICI Bank", "SBI"][Math.floor(Math.random() * 3)],
        app: merch.app,
        status: "Completed",
        date: generateRandomDate()
      });
    }

    await Transaction.insertMany(newTransactions);

    res.status(201).json({
      success: true,
      message: "Sync complete",
      count: newTransactions.length
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Import transactions from CSV or HTML (Takeout)
// @route   POST /api/transactions/import-csv
// @access  Private
export const importCsvTransactions = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a CSV or HTML file' });
    }

    const results = [];
    const fs = await import('fs');
    const fileExt = req.file.originalname.split('.').pop().toLowerCase();

    const processResults = async () => {
      try {
        if (results.length > 0) {
          await Transaction.insertMany(results);
        }
        fs.unlinkSync(req.file.path);
        res.status(200).json({
          success: true,
          message: `Successfully imported ${results.length} transactions`,
          count: results.length
        });
      } catch (err) {
        next(err);
      }
    };

    const categorize = (merchantRaw) => {
      let category = 'Other';
      const lowerMerch = merchantRaw.toLowerCase();
      if (lowerMerch.includes('amazon') || lowerMerch.includes('flipkart')) category = 'Shopping';
      else if (lowerMerch.includes('swiggy') || lowerMerch.includes('zomato') || lowerMerch.includes('food')) category = 'Food';
      else if (lowerMerch.includes('uber') || lowerMerch.includes('ola')) category = 'Travel';
      else if (lowerMerch.includes('netflix') || lowerMerch.includes('spotify') || lowerMerch.includes('google play') || lowerMerch.includes('pokémon')) category = 'Subscriptions';
      else if (lowerMerch.includes('jio') || lowerMerch.includes('airtel')) category = 'Bills';
      return category;
    };

    if (fileExt === 'html') {
      const cheerio = await import('cheerio');
      const htmlContent = fs.readFileSync(req.file.path, 'utf8');
      const $ = cheerio.load(htmlContent);

      $('.outer-cell').each((i, el) => {
        const bodyText = $(el).find('.content-cell.mdl-typography--body-1').first().html();
        if (!bodyText) return;
        
        // Example: Paid ₹11000.00 to MHEPL using Bank Account XXXXXX2209<br>21 Jul 2024, 10:22:19 IST<br>
        // Example: Sent ₹1360.00 using Bank Account XXXXXX2209<br>...
        // Example: Received ₹110.00 from Google<br>...
        
        const lines = bodyText.split('<br>');
        const actionLine = lines[0] || '';
        const dateLine = lines[1] || '';
        
        // Clean HTML entities like &#8377; or raw ₹
        const cleanAction = actionLine.replace(/&#8377;|₹|,/g, '').trim();

        let amount = 0;
        let merchant = '';
        let type = '';
        
        const paidMatch = cleanAction.match(/Paid\s+([\d.,]+)\s+to\s+(.+?)\s+using/i);
        const sentMatch = cleanAction.match(/Sent\s+([\d.,]+)\s+using/i);
        const receivedMatch = cleanAction.match(/Received\s+([\d.,]+)\s+from\s+(.+)/i);

        if (paidMatch) {
          amount = -parseFloat(paidMatch[1].replace(/,/g, ''));
          merchant = paidMatch[2].trim();
          type = 'Paid';
        } else if (sentMatch) {
          amount = -parseFloat(sentMatch[1].replace(/,/g, ''));
          merchant = 'Transfer';
          type = 'Sent';
        } else if (receivedMatch) {
          amount = parseFloat(receivedMatch[1].replace(/,/g, ''));
          merchant = receivedMatch[2].trim();
          type = 'Received';
        }

        if (amount !== 0 && merchant && dateLine) {
           results.push({
            user: req.userId,
            merchant: merchant,
            amount: amount,
            date: new Date(dateLine.replace('IST', '').trim()),
            status: 'Success',
            source: 'Bank/CSV',
            bank: 'Google Pay Takeout',
            app: 'Google Pay',
            category: categorize(merchant),
            raw: cleanAction
          });
        }
      });
      
      await processResults();

    } else {
      // CSV Parsing
      const csv = (await import('csv-parser')).default;
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => {
          const dateRaw = data.date || data.Date || data.DATE || data.Time || data.TIME;
          const amountRaw = data.amount || data.Amount || data.AMOUNT || data.Amount;
          const merchantRaw = data.merchant || data.Merchant || data.MERCHANT || data.Product || data.Description;
          const statusRaw = data.status || data.Status || data.STATUS || data.Status || 'Success';

          if (dateRaw && amountRaw && merchantRaw) {
            let cleanedAmount = parseFloat(amountRaw.toString().replace(/[^0-9.-]+/g,""));
            if (amountRaw.toString().includes('INR') && cleanedAmount > 0) {
               cleanedAmount = -cleanedAmount;
            }
            results.push({
              user: req.userId,
              merchant: merchantRaw,
              amount: cleanedAmount,
              date: new Date(dateRaw),
              status: statusRaw === 'Complete' ? 'Success' : statusRaw,
              source: 'Bank/CSV',
              bank: data['Payment method'] || 'CSV Import',
              app: 'CSV Import',
              category: categorize(merchantRaw),
              raw: data.Description || 'CSV_IMPORT'
            });
          }
        })
        .on('end', processResults);
    }

  } catch (error) {
    next(error);
  }
};
