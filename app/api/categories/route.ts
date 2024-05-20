
import {NextResponse} from "next/server"
import db from './../../../lib/db';
interface category{ name: string, slug: string, imgUrl: string, description: string, isActive: boolean }
export async function POST (req: Request){
try {
  if (!req.body) {
    throw new Error('Request body is missing');
  }
  const { name, slug, imgUrl, description, isActive }:category  = await req.json();
  const existingCategory = await db.category.findUnique({
    where:{
      slug
    }
  })
  if(existingCategory){
    return NextResponse.json({
      data:null,
      message:"Category already exist"
    },{status:409})
  }
  
    const newCategory = await db.category.create({
      data:{
        name,slug,imgUrl,description,isActive
      }
    })
    return NextResponse.json(newCategory)
  
} catch (error) {
  return NextResponse.json({
    message:"Failed to create category",
    error
  },{status:500})
}
}


//==============================get all ctegoris
export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy:{
        createdAt:"desc"
      }
    })
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      message: "Failed to fetch categories",
      error,
    }, { status: 500 });
  }
}