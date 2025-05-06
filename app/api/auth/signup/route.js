import { hash } from 'bcryptjs';
import connectDB from '../../../../config/databse';
import User from '../../../../models/User';

export async function POST(req) {
  await connectDB();

  const { username, email, password } = await req.json();

  if (!email || !password || !username) {
    return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: 'Email already registered' }), { status: 409 });
  }

  const hashedPassword = await hash(password, 12);
  await User.create({ username, email, password: hashedPassword });

  return new Response(JSON.stringify({ message: 'User created' }), { status: 201 });
}
