import { NextResponse } from "next/server";
import db from "@/lib/db";
interface productData {
  name: string;
  slug: string;
  imgUrl: string;
  description: string;
  barCode: string;
  productCode: string;
  price: number;
  salesPrice: number;
  stock: number;
  categoryId: string;
  userId: string;
  brandId: string;
  tagIds: string[];
  isActive: boolean;
  number: number;
  wholesalesPrice: number;
  minWholeSaleQty: number;
  unit: string;
}
export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }

    const { data }: { data: productData[] } = await req.json();

    const slugs = data.map((product) => product.slug);

    const existingProducts = await db.product.findMany({
      where: {
        slug: {
          in: slugs,
        },
      },
    });

    const uniqueData = data.filter(
      (product) =>
        !existingProducts.some((existingProduct:any) => existingProduct.slug === product.slug)
    );

    const newProducts = await db.product.createMany({
      data: uniqueData,
    });

    return NextResponse.json(newProducts);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create products",
        error,
      },
      { status: 500 }
    );
  }
}
