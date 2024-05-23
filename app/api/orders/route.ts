import { NextResponse } from "next/server";
import db from "./../../../lib/db";
interface orderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingCost: number;
  paymentMethod: string;
  paymentToken: string;
  userId: string;
  zipCode: string;
  cartItems: string[];
  streetAddress: string;
  city: string;
  country: string;
}

export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      shippingCost,
      paymentMethod,

      userId,
      zipCode,
      cartItems,
      streetAddress,
      city,
      country,
    }: orderData = await req.json();

    const newOrder = await db.order.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        shippingCost,
        paymentMethod,
        userId,
        zipCode,
        cartItems,
        streetAddress,
        city,
        country,
      },
    });

    if (newOrder && cartItems.length > 0) {
      await db.cart.deleteMany({
        where: {
          id: { in: cartItems },
        },
      });
    }
    




    const customerExist = await db.customer.findUnique({
      where: { email },
    });

    if (!customerExist) {
      await db.customer.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          zipCode,
          streetAddress,
          city,
          country,
        },
      });
    }

    return NextResponse.json(newOrder);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create/update order", error },
      { status: 500 }
    );
  }
}
