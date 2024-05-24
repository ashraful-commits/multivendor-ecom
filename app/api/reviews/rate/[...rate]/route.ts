import { NextResponse } from 'next/server';
import db from '../../../../../lib/db';

export async function GET(req: Request, { params }: { params: { rate: string[] } }) {
  try {
    const [rate,productId] = params.rate;

    const reviews = await db.review.findMany({
      where: {
        productId,
        rating: parseInt(rate)
      }
    });

    return NextResponse.json(reviews);
  } catch (error) {
 
    return NextResponse.json(
      {
        message: error
      },
      { status: 500 }
    );
  }
}
