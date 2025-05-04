import connectDB from '../../../../config/databse';
import Category from '../../../../models/Category';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';

export async function PUT(req, { params }) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  const { name, color } = await req.json();

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { name, color },
      { new: true }
    );

    if (!updatedCategory) {
      return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedCategory), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
