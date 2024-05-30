import { NextResponse } from "next/server";
import db from "@/lib/db";
interface communityType {
  title: string;
  slug: string;
  imgUrl: string;
  description: string;
  categoryIds: string; 
  content: string; 
  isActive: boolean;
}
export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }

    const { data }: { data: communityType[] } = await req.json();

    const slugs = data.map((community) => community.slug);

    const existingCommunities = await db.training.findMany({
      where: {
        slug: {
          in: slugs,
        },
      },
    });

    const uniqueData = data.filter(
      (community) =>
        !existingCommunities.some((existingCommunity:any) => existingCommunity.slug === community.slug)
    );

    const newCommunities = await db.training.createMany({
      data: uniqueData,
    });

    return NextResponse.json(newCommunities);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create communities",
        error,
      },
      { status: 500 }
    );
  }
}
