import { NextResponse } from "next/server";
import db from './../../../lib/db';
interface CartData {
  productId: string;
  userId: string;
  quantity: number;
  total: number;
}

export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error('Request body is missing');
    }
    const { productId, userId, quantity, total }: CartData = await req.json();

      const newCart = await db.cart.create({
        data: { productId, userId, quantity, total },
      });

      return NextResponse.json(newCart);
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create/update cart", error }, { status: 500 });
  }
}
