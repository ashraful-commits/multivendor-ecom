import { NextResponse } from "next/server";
import db from "@/lib/db";
interface tagData {
    name: string;
    slug: string;
    isActive: boolean;
  }
export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }

    const { data }: { data: tagData[] } = await req.json();

    const slugs = data.map((tag) => tag.slug);

    const existingTags = await db.tag.findMany({
      where: {
        slug: {
          in: slugs,
        },
      },
    });

    const uniqueData = data.filter(
      (tag) =>
        !existingTags.some((existingTag:any) => existingTag.slug === tag.slug)
    );

    const newTags = await db.tag.createMany({
      data: uniqueData,
    });

    return NextResponse.json(newTags);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create tags",
        error,
      },
      { status: 500 }
    );
  }
}
