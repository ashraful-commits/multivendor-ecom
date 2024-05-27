import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { imageRemove } from './../../../../lib/ImageRemove';


interface YourDataInterface {
  name: string;
  slug: string;
  imgUrl: string;
  description: string;
  categoryIds: string[]; 
  isActive: boolean;
}
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const marketId = params.id;

    const market = await db.market.findUnique({
      where: {
        id: marketId,
      },
    });

    if (!market) {
      return NextResponse.json({ msg: "market not found" }, { status: 404 });
    }

    return NextResponse.json(market);
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
    const marketId = params.id;
    const { 
      name,
      slug,
      imgUrl,
      description,
      categoryIds,
      isActive,
    }: YourDataInterface = await req.json();

    const existingMarket = await db.market.findUnique({
      where: {
        id: marketId,
      },
    });
    if (existingMarket) {
      const updatedMarket = await db.market.update({
        where: {
          id: marketId,
        },
        data: {name,slug,imgUrl,description,categoryIds,isActive  },
      });

      return NextResponse.json(updatedMarket);
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
    const marketId = params.id;
    const deleteMarket = await db.market.delete({
      where: {
        id: marketId,
      },
    });

   if(deleteMarket){
   await imageRemove(deleteMarket.imgUrl)
   }
    return NextResponse.json(deleteMarket);
    
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
