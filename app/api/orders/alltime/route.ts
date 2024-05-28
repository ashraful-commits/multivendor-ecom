import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET() {
  try {
    const allTimeSales = await db.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(allTimeSales );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch all-time orders', error },
      { status: 500 }
    );
  }
}
