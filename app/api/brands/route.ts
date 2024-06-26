
import {NextResponse} from "next/server"
import db from './../../../lib/db';
import { imageRemove } from '@/lib/ImageRemove';
interface brandData {name:string;slug:string;imgUrl:string;isActive:boolean}
export async function POST (req: Request){
try {
  if (!req.body) {
    throw new Error('Request body is missing');
  }
  const {name,slug,imgUrl,isActive}:brandData = await req.json()
  
  const uniqueBrand = await db.brand.findUnique({
    where:{slug}
  })
  if(uniqueBrand){
    return NextResponse.json({
      message:"Brand already exist!"
    },{status:409})
  }
  const newBran = await db.brand.create({
    data:{name,slug,imgUrl,isActive}
  })
  return NextResponse.json(newBran)
} catch (error) {
  //console.log(error)
  return NextResponse.json({
    message:"Failed to create category",
    error
  },{status:500})
}
}
export async function GET() {
  try {
    const brands = await db.brand.findMany({
      orderBy:{
        createdAt:"desc"
      }
    })
    return NextResponse.json(brands);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      message: "Failed to fetch brands",
      error,
    }, { status: 500 });
  }
}
export async function DELETE(req:Request) {
  try {
    const { Ids }:{Ids:string[]} = await req.json();
    const deleteBrand = await db.brand.deleteMany({
      where: {
        id: {
          in: Ids
        }
      }
    });
    if(deleteBrand){
      deleteBrand?.map(async(item:any)=>{
        await imageRemove(deleteBrand.imgUrl)
      })
    }
    return NextResponse.json(deleteBrand);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete users", error }, { status: 500 });
  }
}
