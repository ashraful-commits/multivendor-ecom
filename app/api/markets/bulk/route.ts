import { NextResponse } from "next/server";
import db from "@/lib/db";
interface marketData {
  name: string;
  slug: string;
  imgUrl: string;
  description: string;
  categoryIds: string[]; // or whatever type categoryIds is
  isActive: boolean;
}

export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }

    const { data }: { data: marketData[] } = await req.json();

    const slugs = data.map((market) => market.slug);

    const existingcustomers = await db.market.findMany({
      where: {
        slug: {
          in: slugs,
        },
      },
    });

    const uniqueData = data.filter(
      (market) =>
        !existingcustomers.some((existingcustomer:any) => existingcustomer.slug === market.slug)
    );

    const newcustomers = await db.market.createMany({
      data: uniqueData,
    });

    return NextResponse.json(newcustomers);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create customers",
        error,
      },
      { status: 500 }
    );
  }
}
