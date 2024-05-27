import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { imageRemove } from './../../../../lib/ImageRemove';


interface brandData {name:string;slug:string;imgUrl:string;isActive:boolean}
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const brandId = params.id;

    const brand = await db.brand.findUnique({
      where: {
        id: brandId,
      },
    });

    if (!brand) {
      return NextResponse.json({ msg: "brand not found" }, { status: 404 });
    }

    return NextResponse.json(brand);
  } catch (error) {

    return NextResponse.json(
      {
        msg: error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const brandId = params.id;
    const { name,slug,imgUrl,isActive }: brandData = await req.json();

    const existingBrand = await db.brand.findUnique({
      where: {
        id: brandId,
      },
    });
    if (existingBrand) {
      const updatedBrand = await db.brand.update({
        where: {
          id: brandId,
        },
        data: { name,slug,imgUrl,isActive },
      });

      return NextResponse.json(updatedBrand);
    } 
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
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const brandId = params.id;
    const deleteBrand = await db.brand.delete({
      where: {
        id: brandId,
      },
    });

   if(deleteBrand){
   await imageRemove(deleteBrand.imgUrl)
   }
      return NextResponse.json(deleteBrand);
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:error,
      },
      { status: 500 }
    );
  }
}
