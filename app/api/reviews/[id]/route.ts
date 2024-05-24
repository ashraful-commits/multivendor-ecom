import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;
    const reviews = await db.review.findMany({
      where: {
        productId
      },
      include: {
        user: true,     
        product: true  
      }
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch review",
        error,
      },
      { status: 500 }
    );
  }
}
