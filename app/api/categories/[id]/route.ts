import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { imageRemove } from './../../../../lib/ImageRemove';


interface category{ name: string, slug: string, imgUrl: string, description: string, isActive: boolean }
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const categoryId = params.id;

    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return NextResponse.json({ msg: "category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
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
    const categoryId = params.id;
    const { name, slug, imgUrl, description, isActive }:category  = await req.json();

    const existingCategory = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (existingCategory) {
      const updatedCategory = await db.category.update({
        where: {
          id: categoryId,
        },
        data: { name, slug, imgUrl, description, isActive  },
      });

      return NextResponse.json(updatedCategory);
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
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const categoryId = params.id;
    const deleteCategory = await db.category.delete({
      where: {
        id: categoryId,
      },
    });

   if(deleteCategory){
   await imageRemove(deleteCategory.imgUrl)
   }
    return NextResponse.json(deleteCategory);
    
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
