import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { imageRemove } from "./../../../../lib/ImageRemove";

interface communityType {
  title: string;
  slug: string;
  imgUrl: string;
  description: string;
  categoryIds: string[];
  content: string;
  isActive: boolean;
}
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const communityId = params.id;
    const communityData = await db.training.findUnique({
      where: {
        id: communityId,
      },
    });

    return NextResponse.json(communityData);
  } catch (error) {
    return NextResponse.json(
      {
        msg: error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const communityId = params.id;
    const {
      title,
      slug,
      imgUrl,
      description,
      categoryIds,
      content,
      isActive,
    }: communityType = await req.json();

    const existingCommunity = await db.training.findUnique({
      where: {
        id: communityId,
      },
    });
    if (existingCommunity) {
      const updatedCommunity = await db.training.update({
        where: {
          id: communityId,
        },
        data: {
          title,
          slug,
          imgUrl,
          description,
          categoryIds,
          content,
          isActive,
        },
      });

      return NextResponse.json(updatedCommunity);
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
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const communityId = params.id;
    const deleteCommunity = await db.training.delete({
      where: {
        id: communityId,
      },
    });

    if (deleteCommunity) {
      await imageRemove(deleteCommunity.imgUrl);
    }
    return NextResponse.json(deleteCommunity);
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
