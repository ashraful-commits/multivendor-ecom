import { NextResponse } from "next/server";
import db from './../../../lib/db';
//import { NextApiRequest, NextApiResponse } from 'next';
interface cartData  { productId:string;userId:string;quantity:number,total:number }
export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error('Request body is missing');
    }

    const { productId,userId,quantity,total }:cartData = await req.json();
    const newCart = await db.cart.create({
      data: { productId,userId,quantity,total }
    });

    return NextResponse.json(newCart);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Failed to create carts", error }, { status: 500 });
  }
}


