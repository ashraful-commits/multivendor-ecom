import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const favorites = await db.favorite.findMany({
      where: {
        userId: id,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch Favorite", error },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const deleteFavorite = await db.favorite.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteFavorite);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete favorite", error },
      { status: 500 }
    );
  }
}


