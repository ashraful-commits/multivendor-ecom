import { NextResponse } from "next/server";
import db from "@/lib/db";
interface couponData {
  name: string;
  coupon: string;
  date: string; 
  isActive: boolean;
}
export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }

    const { data }: { data: couponData[] } = await req.json();

    const dates = data.map((coupon) => coupon.date);

    const existingCoupons = await db.coupon.findMany({
      where: {
        date: {
          in: dates,
        },
      },
    });

    const uniqueData = data.filter(
      (coupon) =>
        !existingCoupons.some((existingCoupon:any) => existingCoupon.date === coupon.date)
    );

    const newCoupons = await db.coupon.createMany({
      data: uniqueData,
    });

    return NextResponse.json(newCoupons);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create coupons",
        error,
      },
      { status: 500 }
    );
  }
}
