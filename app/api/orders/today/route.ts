import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { startOfToday } from 'date-fns';

export async function GET() {
  try {
    const today = startOfToday();
  console.log(today)
    const todayOrders = await db.order.findMany({
      where: {
        createdAt: {
          gte: today,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json( todayOrders );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch today’s orders', error },
      { status: 500 }
    );
  }
}
