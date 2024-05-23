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
    const search = url.searchParams.get('search')?.trim() || '';
    const minPrice = parseInt(url.searchParams.get('minPrice') || '0', 10);
    const maxPrice = parseInt(url.searchParams.get('maxPrice') || '1000000', 10);
    const category = url.searchParams.get('category')?.trim() || '';
    const brand = url.searchParams.get('brand')?.trim() || '';
    const tags = url.searchParams.get('tag')?.split(',') || [];

    // Construct the `where` object based on the provided query parameters
    const where: {
      name?: { startsWith: string };
      salesPrice?: { gte?: number; lte?: number };
      categoryId?: string;
      brandId?: string;
      tagIds?: { hasEvery?: string[] };
    } = {};

    if (search) {
      where.name = {
        startsWith: search.charAt(0).toUpperCase() + search.slice(1).toLowerCase(),
      };
    }

    if (minPrice > 0 || maxPrice < 1000000) {
      where.salesPrice = {};
      if (minPrice > 0) {
        where.salesPrice.gte = minPrice;
      }
      if (maxPrice < 1000000) {
        where.salesPrice.lte = maxPrice;
      }
    }

    if (category) {
      where.categoryId = category;
    }

    if (brand) {
      where.brandId = brand;
    }

    if (tags.length > 0 && tags.some(tag => tag.trim() !== '')) {
      // Filter out empty strings from tags
      const filteredTags = tags.filter(tag => tag.trim() !== '');
      where.tagIds = {
        hasEvery: filteredTags,
      };
    }

    const products = await db.product.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {

    return NextResponse.json(
      {
        message: error
      },
      { status: 500 }
    );
  }
}
