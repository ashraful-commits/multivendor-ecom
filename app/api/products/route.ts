import { NextResponse } from "next/server";
import db from "./../../../lib/db";
interface YourDataInterface {
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
    const {
      name,
      slug,
      imgUrl,
      description,
      barCode,
      productCode,
      price,
      salesPrice,
      stock,
      categoryId,
      userId,
      brandId,
      tagIds,
      isActive,
      number,
      wholesalesPrice,
      minWholeSaleQty,
      unit,
    }: YourDataInterface = await req.json();

    const uniqueProduct = await db.product.findUnique({
      where: { slug },
    });

    if (uniqueProduct) {
      NextResponse.json(
        {
          message: "Product already Exist",
        },
        { status: 409 }
      );
    } else {
      const newProduct = await db.product.create({
        data: {
          name,
          slug,
          imgUrl,
          description,
          barCode,
          productCode,
          price,
          salesPrice,
          stock,
          categoryId,
          userId,
          brandId,
          tagIds,
          isActive,
          number,
          wholesalesPrice,
          minWholeSaleQty,
          unit,
        },
      });
      return NextResponse.json(newProduct);
    }
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create Product",
        error,
      },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    let search = url.searchParams.get('search') || '';
    search = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
    const minPrice = parseInt(url.searchParams.get('minPrice') ?? '') || 0;
    const maxPrice = parseInt(url.searchParams.get('maxPrice') ?? '') || 100000;
    const category = url.searchParams.get('category') || '';
    const brand = url.searchParams.get('brand') || '';

    // Type-safe construction of the `where` object
    const where: {
      name?: { startsWith: string };
      salesPrice?: { gte?: number; lte?: number };
      categoryId?: string;
      brandId?: string;
    } = {};

    if (search !== "") {
      where.name = {
        startsWith: search,
      };
    }

    // Initialize `where.salesPrice` if minPrice or maxPrice is set
    if (minPrice !== 0 || maxPrice !== 100000) {
      where.salesPrice = {};
      if (minPrice !== 0) {
        where.salesPrice.gte = minPrice;
      }
      if (maxPrice !== 100000) {
        where.salesPrice.lte = maxPrice;
      }
    }

    if (category !== "") {
      where.categoryId = category;
    }

    if (brand !== "") {
      where.brandId = brand;
    }

    const products = await db.product.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch products",
        error,
      },
      { status: 500 }
    );
  }
}
