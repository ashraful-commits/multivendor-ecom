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

    // Check if the product already exists in the cart
    const existingCart = await db.cart.findFirst({
      where: {
        productId,
        userId,
      },
    });

    if (existingCart) {
      await db.cart.delete({ where: { id: existingCart.id } });
      return NextResponse.json({msg:"Removed to cart"});
    } else {

      const newCart = await db.cart.create({
        data: { productId, userId, quantity, total },
      });

      return NextResponse.json(newCart);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create/update cart", error }, { status: 500 });
  }
}
