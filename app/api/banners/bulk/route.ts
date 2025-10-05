import { NextResponse } from "next/server";
import db from "@/lib/db";
interface BannerData {
  name: string;
  title: string;
  imgUrl: string;
  isActive: boolean;
}

// Type for the request body
interface BulkCreateRequest {
  data: BannerData[];
}
export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }

    const { data }: BulkCreateRequest = await req.json();

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
        !existingbanners.some(
          (existingbanner: any) => existingbanner.title === banner.title
        )
    ); // createMany expects an array of banner objects
    const newbanners = await db.banner.createMany({
      data: uniqueData.map((banner) => ({
        title: banner.title,
        imgUrl: banner.imgUrl,
        link: banner.name, 
        isActive: banner.isActive,
      })),
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
