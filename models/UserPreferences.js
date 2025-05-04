import mongoose from 'mongoose';

const UserPreferencesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, // One preferences document per user
  },
  layout: {
    type: {
      type: String,
      enum: ['list', 'grid'],
      default: 'list',
    },
    columns: {
      type: Number,
      default: 2, // Will only matter if type is 'grid'
    },
  },
}, { timestamps: true });

export default mongoose.models.UserPreferences || mongoose.model('UserPreferences', UserPreferencesSchema);
