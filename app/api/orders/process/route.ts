import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET() {
  try {
    const processingOrders = await db.order.findMany({
      where: {
        status: 'PROCESS',
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(processingOrders);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch processing orders', error },
      { status: 500 }
    );
  }
}
