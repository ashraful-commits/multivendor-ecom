import { NextResponse } from "next/server";
import db from './../../../../../lib/db';

export async function GET(req:Request, { params }: { params: { catId: string } }) {
    try {
      const categoryId = params.catId;
      const product = await db.product.findMany({
        where: {
          categoryId: categoryId,
        },
      });
      if (!product) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
      }
      // console.log(product)
      return NextResponse.json(product);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          message: "Failed to fetch product",
          error,
        },
        { status: 500 }
      );
    }
  }