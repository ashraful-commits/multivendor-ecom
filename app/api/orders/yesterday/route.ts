import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { startOfYesterday, startOfToday } from 'date-fns';

export async function GET() {
  try {
    const today = startOfToday();
    const yesterday = startOfYesterday();
  console.log(today,yesterday)
    const yesterdayOrders = await db.order.findMany({
      where: {
        createdAt: {
          gte: yesterday, 
          lt: today,     
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json( yesterdayOrders );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch yesterday’s orders', error },
      { status: 500 }
    );
  }
}
