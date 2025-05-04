import bcrypt from 'bcryptjs';
import connectDB from '../config/databse';
import User from '../models/User';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const getUserByEmail = async (email) => {
  await connectDB(); // Connect to MongoDB using Mongoose
  return await User.findOne({ email });
};
