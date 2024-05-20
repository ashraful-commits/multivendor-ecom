
import {NextResponse} from "next/server"
import db from './../../../lib/db';
interface YourDataInterface {
  name: string;
  slug: string;
  isActive: boolean;
}
export async function POST (req: Request){
try {
 
  if (!req.body) {
    throw new Error('Request body is missing');
  }
  const { name, slug, isActive }: YourDataInterface = await req.json();
  
  const uniqueTag = await db.tag.findUnique({
    where:{slug}

  })
  if(uniqueTag){
   return NextResponse.json({
      message:"Tag already exist !"
    },{status:409})
  }

  const newTag = await db.tag.create({data:{name,slug,isActive}})

  return NextResponse.json(newTag)
} catch (error) {
  return NextResponse.json({
    message:"Failed to create category",
    error
  },{status:500})
}
}


export async function GET() {
  try {
    const tags = await db.tag.findMany( {orderBy:{
      createdAt:"desc"
    }})
    return NextResponse.json(tags);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      message: "Failed to fetch tag",
      error,
    }, { status: 500 });
  }
}
