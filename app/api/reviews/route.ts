import { NextResponse } from "next/server";
import db from "./../../../lib/db";

interface reviewData {
  userId: string;
  productId: string;
  review: string;
  rating: number;
}

export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }
    const { userId, productId, review, rating }: reviewData = await req.json();

      const newReview = await db.review.create({
        data: {
          userId,
          productId,
          review,
          rating,
        },
      });
      return NextResponse.json(newReview);
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create/update review", error },
      { status: 500 }
    );
  }
}
