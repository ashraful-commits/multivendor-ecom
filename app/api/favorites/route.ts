import { NextResponse } from "next/server";
import db from "./../../../lib/db";

type Favorite = {
  productId: string;
  userId: string;
};

export async function POST(req: Request) {
  try {
    // Check if the request body is present
    if (!req.body) {
      throw new Error("Request body is missing");
    }

    // Parse the JSON body to extract productId and userId
    const { productId, userId }: Favorite = await req.json();

    // Check if the favorite entry already exists
    const existingFavorite = await db.favorite.findFirst({
      where: {
        productId,
        userId,
      },
    });
    if (existingFavorite) {
    const deleteFav = await db.favorite.delete({
        where: {
          id: existingFavorite.id,
        },
      });
      return NextResponse.json({msg:"removed to Favorite"});
    } else {
      // If the favorite does not exist, add it
      const createFav = await db.favorite.create({
        data: {
          productId,
          userId,
        },
      });
      return NextResponse.json(createFav);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "unknown error", error },
      { status: 500 }
    );
  }
}
