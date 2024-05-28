import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { startOfMonth, subMonths, endOfMonth } from 'date-fns';

export async function GET() {
  try {
    const startOfCurrentMonth = startOfMonth(new Date());
    const startOfLastMonth = startOfMonth(subMonths(new Date(), 1));
    const endOfLastMonth = endOfMonth(subMonths(new Date(), 1));

    const lastMonthOrders = await db.order.findMany({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lt: startOfCurrentMonth,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json( lastMonthOrders );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch last month’s orders', error },
      { status: 500 }
    );
  }
}
