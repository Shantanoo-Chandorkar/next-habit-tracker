import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completedDaysByYear: {
    type: Map,
    of: [Number], // e.g., { "2025": [60, 365] }
    default: {},
  },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  frequency: { type: String, default: 'Daily' }, // Can be expanded later
}, { timestamps: true });

export default mongoose.models.Habit || mongoose.model('Habit', HabitSchema);
