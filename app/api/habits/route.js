// app/api/habits/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';
import connectDB from '../../../config/databse';
import Habit from '../../../models/Habit';
import User from '../../../models/User';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, description, frequency, categoryId } = await req.json();

  if (!title || !categoryId) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  try {
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    const habit = new Habit({
      title,
      description,
      frequency,
      categoryId,
      userId: user._id,
    });

    await habit.save();

    return NextResponse.json({ message: 'Habit created', habit }, { status: 201 });
  } catch (error) {
    console.error('Create Habit Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const habits = await Habit.find({ userId: session.user.id }).populate('userId');
    return new Response(JSON.stringify(habits), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch habits' }), { status: 500 });
  }
}
