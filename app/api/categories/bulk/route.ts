import { NextResponse } from "next/server";
import db from "@/lib/db";
interface categorydata{ name: string, slug: string, imgUrl: string, description: string, isActive: boolean }
export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }

    const { data }: { data: categorydata[] } = await req.json();

    const slugs = data.map((cateory) => cateory.slug);

    const existingcateorys = await db.category.findMany({
      where: {
        slug: {
          in: slugs,
        },
      },
    });

    const uniqueData = data.filter(
      (cateory) =>
        !existingcateorys.some((existingcateory:any) => existingcateory.slug === cateory.slug)
    );

    const newcateorys = await db.category.createMany({
      data: uniqueData,
    });

    return NextResponse.json(newcateorys);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create cateorys",
        error,
      },
      { status: 500 }
    );
  }
}
