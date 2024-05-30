import {NextResponse} from "next/server"
import db from './../../../lib/db';
import { imageRemove } from '@/lib/ImageRemove';
interface YourDataInterface {
  name: string;
  slug: string;
  imgUrl: string;
  description: string;
  categoryIds: string[]; // or whatever type categoryIds is
  isActive: boolean;
}

export async function POST (req: Request){
try {
 
  if (!req.body) {
    throw new Error('Request body is missing');
  }
  const { 
    name,
    slug,
    imgUrl,
    description,
    categoryIds,
    isActive,
  }: YourDataInterface = await req.json();
  
  const newMarket = await db.market.create({
    data:{name,slug,imgUrl,description,categoryIds,isActive}
  }) 
  return NextResponse.json(newMarket)
} catch (error) {
  //console.log(error)
  return NextResponse.json({
    message:"Failed to create market",
    error
  },{status:500})
}
}
export async function GET() {
  try {
    const markets = await db.market.findMany({
      orderBy:{
        createdAt:"desc"
      }
    })
    return NextResponse.json(markets);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      message: "Failed to fetch markets",
      error,
    }, { status: 500 });
  }
}

export async function DELETE(req:Request) {
  try {
    const { Ids }:{Ids:string[]} = await req.json();
    const deletedMarket = await db.market.deleteMany({
      where: {
        id: {
          in: Ids
        }
      }
    });
    if(deletedMarket){
      deletedMarket?.map(async(item:any)=>{
        await imageRemove(deletedMarket.imgUrl)
      })
    }
    return NextResponse.json(deletedMarket);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete users", error }, { status: 500 });
  }
}