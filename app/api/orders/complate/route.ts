import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET() {
  try {
    const deliveredOrders = await db.order.findMany({
      where: {
        status: 'COMPLATE',
      },
      orderBy: {
        createdAt: 'desc',
      }
    
    });

    return NextResponse.json( deliveredOrders );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch delivered orders', error },
      { status: 500 }
    );
  }
}
