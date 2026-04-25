// Sample data used across PayZen
export const transactions = [
  { id: "TX1029", merchant: "Swiggy", logo: "🍔", raw: "UPI/SWIGGY*ORDER/9381", category: "Food", amount: -428, date: "2025-04-24 19:42", bank: "HDFC", app: "GPay", status: "Success" },
  { id: "TX1028", merchant: "Amazon", logo: "📦", raw: "UPI/AMZN-RETAIL/PAY", category: "Shopping", amount: -1299, date: "2025-04-24 14:08", bank: "ICICI", app: "PhonePe", status: "Success" },
  { id: "TX1027", merchant: "Salary - Acme Corp", logo: "💼", raw: "NEFT/ACME-PAYROLL", category: "Income", amount: 84500, date: "2025-04-24 09:00", bank: "HDFC", app: "Bank", status: "Success" },
  { id: "TX1026", merchant: "Netflix", logo: "🎬", raw: "UPI/NETFLIX.COM/SUB", category: "Subscription", amount: -649, date: "2025-04-23 12:00", bank: "HDFC", app: "Auto-debit", status: "Success" },
  { id: "TX1025", merchant: "Uber", logo: "🚕", raw: "UPI/UBER-INDIA/RIDE", category: "Travel", amount: -187, date: "2025-04-23 08:42", bank: "ICICI", app: "GPay", status: "Success" },
  { id: "TX1024", merchant: "Zomato", logo: "🍱", raw: "UPI/ZOMATO-LIM/F-219", category: "Food", amount: -312, date: "2025-04-22 21:15", bank: "HDFC", app: "Paytm", status: "Success" },
  { id: "TX1023", merchant: "BESCOM Electricity", logo: "⚡", raw: "UPI/BESCOM-BILL", category: "Utilities", amount: -2140, date: "2025-04-22 11:00", bank: "ICICI", app: "PhonePe", status: "Success" },
  { id: "TX1022", merchant: "Spotify", logo: "🎧", raw: "UPI/SPOTIFY-IN/SUB", category: "Subscription", amount: -119, date: "2025-04-21 06:00", bank: "HDFC", app: "Auto-debit", status: "Success" },
  { id: "TX1021", merchant: "Unknown Merchant", logo: "❓", raw: "UPI/MRCH-XYZ-9821", category: "Other", amount: -1499, date: "2025-04-20 22:48", bank: "HDFC", app: "GPay", status: "Flagged" },
  { id: "TX1020", merchant: "BigBasket", logo: "🛒", raw: "UPI/BIGBASKET/GROC", category: "Groceries", amount: -1843, date: "2025-04-20 10:22", bank: "ICICI", app: "PhonePe", status: "Success" },
  { id: "TX1019", merchant: "IRCTC", logo: "🚆", raw: "UPI/IRCTC-RAIL/BK", category: "Travel", amount: -845, date: "2025-04-19 17:01", bank: "HDFC", app: "BHIM", status: "Pending" },
  { id: "TX1018", merchant: "Cafe Coffee Day", logo: "☕", raw: "UPI/CCD-OUTLT/POS", category: "Food", amount: -240, date: "2025-04-19 09:30", bank: "HDFC", app: "GPay", status: "Success" },
];

export const recurring = [
  { service: "Netflix Premium", amount: 649, frequency: "Monthly", next: "May 23, 2025", status: "Active", trend: "stable" },
  { service: "Spotify Family", amount: 179, frequency: "Monthly", next: "May 21, 2025", status: "Active", trend: "stable" },
  { service: "Hotstar Super", amount: 299, frequency: "Monthly", next: "May 28, 2025", status: "Active", trend: "stable" },
  { service: "iCloud 200GB", amount: 75, frequency: "Monthly", next: "May 02, 2025", status: "Active", trend: "stable" },
  { service: "Gym Membership", amount: 1499, frequency: "Monthly", next: "May 05, 2025", status: "Rising", trend: "up" },
  { service: "News Plus", amount: 99, frequency: "Monthly", next: "May 12, 2025", status: "Forgotten", trend: "stable" },
  { service: "Cloud Storage Pro", amount: 499, frequency: "Quarterly", next: "Jun 14, 2025", status: "Active", trend: "stable" },
];

export const rewards = [
  { app: "Google Pay", amount: 245, expires: "May 30, 2025", offer: "₹50 cashback on next bill payment", color: "primary" },
  { app: "PhonePe", amount: 180, expires: "Jun 02, 2025", offer: "Scratch card up to ₹100", color: "success" },
  { app: "Paytm", amount: 95, expires: "May 12, 2025", offer: "5% cashback on movies", color: "warning" },
  { app: "HDFC Bank", amount: 1240, expires: "Jul 18, 2025", offer: "Reward points → cash", color: "primary" },
];

export const fraudAlerts = [
  { id: "F-2241", merchant: "Unknown Merchant", amount: 1499, date: "Apr 20, 2025", risk: "High", status: "Under Review" },
  { id: "F-2235", merchant: "International Charge", amount: 4220, date: "Apr 14, 2025", risk: "Medium", status: "Resolved" },
  { id: "F-2228", merchant: "Repeat Debit X3", amount: 240, date: "Apr 09, 2025", risk: "Low", status: "Dismissed" },
];

export const weeklySpend = [
  { day: "Mon", amount: 1240 },
  { day: "Tue", amount: 890 },
  { day: "Wed", amount: 1820 },
  { day: "Thu", amount: 640 },
  { day: "Fri", amount: 2410 },
  { day: "Sat", amount: 3180 },
  { day: "Sun", amount: 1520 },
];

export const categorySpend = [
  { name: "Food", value: 4820, color: "hsl(228 67% 54%)" },
  { name: "Shopping", value: 6420, color: "hsl(162 82% 40%)" },
  { name: "Travel", value: 2180, color: "hsl(41 100% 48%)" },
  { name: "Bills", value: 3240, color: "hsl(228 90% 65%)" },
  { name: "Other", value: 1840, color: "hsl(210 9% 60%)" },
];

export const notifications = [
  { id: 1, type: "fraud", title: "Suspicious transaction blocked", body: "₹1,499 to Unknown Merchant flagged for review.", time: "12 min ago", read: false },
  { id: 2, type: "cashback", title: "₹50 cashback expiring soon", body: "Use your Google Pay reward before May 12.", time: "2 hr ago", read: false },
  { id: 3, type: "autodebit", title: "Netflix auto-debit tomorrow", body: "₹649 will be debited from HDFC ••4521.", time: "5 hr ago", read: false },
  { id: 4, type: "payment", title: "Salary credited", body: "₹84,500 received from Acme Corp.", time: "1 day ago", read: true },
  { id: 5, type: "cashback", title: "New PhonePe scratch card", body: "Scratch your ₹100 reward now.", time: "2 days ago", read: true },
  { id: 6, type: "autodebit", title: "Gym membership rising cost", body: "Charge increased from ₹1,299 to ₹1,499.", time: "3 days ago", read: true },
];
