import { NextResponse } from 'next/server';
import db from '../../../../lib/db';



interface YourDataInterface {
  name: string;
  slug: string;
  isActive: boolean;
}
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const tagId = params.id;

    const tag = await db.tag.findUnique({
      where: {
        id: tagId,
      },
    });

    if (!tag) {
      return NextResponse.json({ msg: "tag not found" }, { status: 404 });
    }

    return NextResponse.json(tag);
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
    const tagId = params.id;
    const { name, slug, isActive }: YourDataInterface = await req.json();

    const existingTag = await db.tag.findUnique({
      where: {
        id: tagId,
      },
    });
    if (existingTag) {
      const updatedTag = await db.tag.update({
        where: {
          id: tagId,
        },
        data: {name,slug,isActive},
      });

      return NextResponse.json(updatedTag);
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
    const tagId = params.id;
    const deleteTag = await db.tag.delete({
      where: {
        id: tagId,
      },
    });


    return NextResponse.json(deleteTag);
    
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
