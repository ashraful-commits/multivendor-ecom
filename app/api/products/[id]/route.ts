import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
//import { NextApiRequest, NextApiResponse } from 'next';
 
export async function GET(req:Request, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;
 
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

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
