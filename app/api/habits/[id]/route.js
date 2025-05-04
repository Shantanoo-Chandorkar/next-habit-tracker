import connectDB from '../../../../config/databse';
import Habit from '../../../../models/Habit';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';

export async function PUT(req, context) {
  const params = await context.params;
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  const { title, description, frequency, categoryId } = await req.json();

  try {
    const updatedHabit = await Habit.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { title, description, frequency, categoryId },
      { new: true }
    );

    if (!updatedHabit) {
      return new Response(JSON.stringify({ error: 'Habit not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedHabit), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function DELETE(req, context) {
  const params = await context.params;
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;

  try {
    const deleteHabit = await Habit.findOneAndDelete({ _id: id, userId: session.user.id });
    if (!deleteHabit) {
      return new Response(JSON.stringify({ error: 'Habit not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Habit deleted successfully', _id: deleteHabit._id }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}