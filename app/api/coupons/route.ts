import { NextResponse } from "next/server";
import db from './../../../lib/db';
interface YourDataInterface {
  name: string;
  coupon: string;
  date: string; 
  isActive: boolean;
}
export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error('Request body is missing');
    }
  
    
    const { name, coupon, date, isActive }: YourDataInterface = await req.json();
    
    // Assuming date is provided in ISO 8601 format
    const newCoupon = await db.coupon.create({
      data: {
        name,
        coupon,
        date,
        isActive,
      },
    });

    return NextResponse.json(newCoupon);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      message: "Failed to create coupon",
      error,
    }, { status: 500 });
  }
}
//========================get data
export async function GET() {
  try {
    const coupons = await db.coupon.findMany( {orderBy:{
      createdAt:"desc"
    }})
    return NextResponse.json(coupons);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      message: "Failed to fetch coupon",
      error,
    }, { status: 500 });
  }
}
