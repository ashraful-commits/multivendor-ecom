import { NextResponse } from "next/server";
import db from "@/lib/db";
interface brandData {name:string;slug:string;imgUrl:string;isActive:boolean}
export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }

    const { data }: { data: brandData[] } = await req.json();

    const slugs = data.map((brand) => brand.slug);

    const existingbrands = await db.brand.findMany({
      where: {
        slug: {
          in: slugs,
        },
      },
    });

    const uniqueData = data.filter(
      (brand) =>
        !existingbrands.some((existingbrand:any) => existingbrand.slug === brand.slug)
    );

    const newbrands = await db.brand.createMany({
      data: uniqueData,
    });

    return NextResponse.json(newbrands);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: "Failed to create brands",
        error,
      },
      { status: 500 }
    );
  }
}
