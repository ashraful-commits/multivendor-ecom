import { NextResponse } from "next/server";
import db from "@/lib/db";
interface bannerData {
    name: string;
    title: string;
    imgUrl: string;
    isActive: boolean;
  }
export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }

    const { data }: { data: bannerData[] } = await req.json();

    const titles = data.map((banner) => banner.title);

    const existingbanners = await db.banner.findMany({
      where: {
        title: {
          in: titles,
        },
      },
    });

    const uniqueData = data.filter(
      (banner) =>
        !existingbanners.some((existingbanner:any) => existingbanner.title === banner.title)
    );

    const newbanners = await db.banner.createMany({
      data: uniqueData,
    });

    return NextResponse.json(newbanners);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create banners",
        error,
      },
      { status: 500 }
    );
  }
}
