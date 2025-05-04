import connectDB from '../../../../../config/databse';
import Habit from '../../../../../models/Habit';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/authOptions';

export async function PATCH(req, context) {
  const params = await context.params;
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });

  const habitId = params.id; // Updated to use params directly
  const { year, dayOfYear } = await req.json(); // Sent from client

  try {
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return new Response('Habit not found', { status: 404 });
    }

    if (!habit.completedDaysByYear) {
      habit.completedDaysByYear = new Map();
    }

    // Use string key to be safe with Map
    const yearKey = year.toString();
    const existing = habit.completedDaysByYear.get(yearKey) || [];

    let updatedDays;
    if (existing.includes(dayOfYear)) {
      updatedDays = existing.filter(d => d !== dayOfYear); // Toggle off
    } else {
      updatedDays = [...existing, dayOfYear]; // Toggle on
    }

    habit.completedDaysByYear.set(yearKey, updatedDays);

    await habit.save();

    return new Response(JSON.stringify(habit), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[HABIT PATCH ERROR]', err);
    return new Response('Error updating habit', { status: 500 });
  }
}
