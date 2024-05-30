
import {NextResponse} from "next/server"
import db from './../../../lib/db';
import { imageRemove } from '@/lib/ImageRemove';
interface communityType {
  title: string;
  slug: string;
  imgUrl: string;
  description: string;
  categoryIds: string; 
  content: string; 
  isActive: boolean;
}
export async function POST (req: Request){
try {
 
  if (!req.body) {
    throw new Error('Request body is missing');
  }
  const { title, slug, imgUrl, description, categoryIds, content, isActive }: communityType = await req.json();
  
  const uniqueTraining = await db.training.findUnique({
    where: { slug },
  });
  if (uniqueTraining) {
   return NextResponse.json(
      {
        message: 'Training already Exist',
      },
      { status: 409 },
    );
  }else{
    const newTraining = await db.training.create({
      data:{
        title,slug,imgUrl,description,categoryIds,content,isActive
      }
    })
    return NextResponse.json(newTraining)
  }

} catch (error) {
  console.log(error)
  return NextResponse.json({
    message:"Failed to create Training",
    error
  },{status:500})
}
}

export async function GET() {
  try {
    const Training = await db.training.findMany({
      orderBy:{
        createdAt:"desc"
      }
    })
    return NextResponse.json(Training);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      message: "Failed to fetch Training",
      error,
    }, { status: 500 });
  }
}
export async function DELETE(req:Request) {
  try {
    const { Ids }:{Ids:string[]} = await req.json();
    const deletedCommunity = await db.training.deleteMany({
      where: {
        id: {
          in: Ids
        }
      }
    });
    if(deletedCommunity){
      deletedCommunity?.map(async(item:any)=>{
        await imageRemove(deletedCommunity.imgUrl)
      })
    }
    return NextResponse.json(deletedCommunity);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete users", error }, { status: 500 });
  }
}