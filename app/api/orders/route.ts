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
  productIds: string[];
  total: number;
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
      productIds,
      total,
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
        total,
        streetAddress,
        city,
        country,
        productIds,
      },
    });

    if (newOrder && cartItems.length > 0) {
      await db.cart.updateMany({
        where: {
          id: { in: cartItems },
        },
        data: {
          status: false
        }
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
export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy:{
        createdAt:"desc"
      },
      include:{
        user:true
      }
    })
    return NextResponse.json(orders);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      message: "Failed to fetch orders",
      error,
    }, { status: 500 });
  }
}

export async function DELETE(req:Request) {
  try {
    const { Ids }:{Ids:string[]} = await req.json();
    const deletedOrder = await db.order.deleteMany({
      where: {
        id: {
          in: Ids
        }
      }
    });
    
    return NextResponse.json(deletedOrder);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete users", error }, { status: 500 });
  }
}