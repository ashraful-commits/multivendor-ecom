import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
//import { NextApiRequest, NextApiResponse } from 'next';
import { MutiPleImageRemove } from '../../../../lib/ImageRemove';
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
export async function GET(req:Request, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;
 
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include:{
        category: true,
        brand: true,
        tags: true, 
      }
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
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;
    console.log(productId)
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
      unit 
    }: YourDataInterface = await req.json();

    const existingProduct = await db.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (existingProduct) {
      const updatedProduct = await db.product.update({
        where: {
          id: productId,
        },
        data: { name,
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
          unit  },
      });

      return NextResponse.json(updatedProduct);
    } 
  } catch (error) {
console.log(error)
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;
    const deleteProduct = await db.product.delete({
      where: {
        id: productId,
      },
    });

   if(deleteProduct){
   await MutiPleImageRemove(deleteProduct.imgUrl)
   }
    return NextResponse.json(deleteProduct);
    
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
