import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { startOfMonth } from 'date-fns';

export async function GET() {
  try {
    const startOfCurrentMonth = startOfMonth(new Date());

    const thisMonthOrders = await db.order.findMany({
      where: {
        createdAt: {
          gte: startOfCurrentMonth,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json( thisMonthOrders );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch this month’s orders', error },
      { status: 500 }
    );
  }
}
