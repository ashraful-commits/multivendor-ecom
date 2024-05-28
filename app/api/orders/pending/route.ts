import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET() {
  try {
    const pendingOrders = await db.order.findMany({
      where: {
        status: 'PENDING',
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json( pendingOrders );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch pending orders', error },
      { status: 500 }
    );
  }
}
