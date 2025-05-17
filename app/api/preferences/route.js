// app/api/preferences/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';
import UserPreferences from '../../../models/UserPreferences';
import connectDB from '../../../config/databse';

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const prefs = await UserPreferences.findOne({ userId: session.user._id });
  return new NextResponse(JSON.stringify(prefs || {}), { status: 200 });
}


export async function PATCH(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const body = await req.json();
  const { type } = body.layout;

  if (!['list', 'grid'].includes(type)) {
    return new NextResponse(JSON.stringify({ error: 'Invalid layout type' }), { status: 400 });
  }

  const updated = await UserPreferences.findOneAndUpdate(
    { userId: session.user._id },
    {
      layout: {
        type,
      },
    },
    { upsert: true, new: true }
  );

  return new NextResponse(JSON.stringify(updated), { status: 200 });
}
