import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    default: 'Monthly',
  },
  next: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Active', 'Forgotten', 'Rising'],
    default: 'Active',
  },
  trend: {
    type: String,
    enum: ['stable', 'up', 'down'],
    default: 'stable',
  }
}, {
  timestamps: true
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
