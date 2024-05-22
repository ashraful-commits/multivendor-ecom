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
      // If the product exists, update the quantity and total
      const updatedCart = await db.cart.update({
        where: { id: existingCart.id },
        data: {
          quantity: existingCart.quantity + quantity,
          total: existingCart.total + total,
        },
      });

      return NextResponse.json(updatedCart);
    } else {
      // If the product does not exist, create a new entry in the cart
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
