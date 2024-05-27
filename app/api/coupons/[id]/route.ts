import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { imageRemove } from './../../../../lib/ImageRemove';


interface coupon {
  name: string;
  coupon: string;
  date: string; 
  isActive: boolean;
}
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const couponId = params.id;

    const coupon = await db.coupon.findUnique({
      where: {
        id: couponId,
      },
    });

    if (!coupon) {
      return NextResponse.json({ msg: "coupon not found" }, { status: 404 });
    }

    return NextResponse.json(coupon);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        msg: error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const couponId = params.id;
    const {name, coupon, date, isActive }:coupon  = await req.json();

    const existingCoupon = await db.coupon.findUnique({
      where: {
        id: couponId,
      },
    });
    if (existingCoupon) {
      const updatedCoupon = await db.coupon.update({
        where: {
          id: couponId,
        },
        data: {name, coupon, date, isActive  },
      });

      return NextResponse.json(updatedCoupon);
    } 
  } catch (error) {

    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const couponId = params.id;
    const deleteCoupon = await db.coupon.delete({
      where: {
        id: couponId,
      },
    });

   if(deleteCoupon){
   await imageRemove(deleteCoupon.imgUrl)
   }
    return NextResponse.json(deleteCoupon);
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
