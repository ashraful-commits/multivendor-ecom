
import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET(req:Request, { params }: { params: { id: string }}) {
  try {
    const { id } = params;
      const carts = await db.cart.findMany({
        where:{
          userId:id
        },
        include: {
          product: true, 
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
     
      return NextResponse.json(carts);
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: "Failed to fetch cart", error }, { status: 500 });
    }
  }