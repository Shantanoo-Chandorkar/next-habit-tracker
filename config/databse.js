// config/databse.js
import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'habit-tracker',
    });

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    throw new Error('Database connection failed');
  }
};

export default connectDB;
