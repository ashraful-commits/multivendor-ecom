
import {NextResponse} from "next/server"
import db from './../../../lib/db';
interface YourDataInterface {
  title: string;
  slug: string;
  imgUrl: string;
  description: string;
  categoryIds: string[]; // or whatever type categoryIds is
  content: string; // or whatever type content is
  isActive: boolean; // or whatever type isActive is
}
export async function POST (req: Request){
try {
 
  if (!req.body) {
    throw new Error('Request body is missing');
  }
  const { title, slug, imgUrl, description, categoryIds, content, isActive }: YourDataInterface = await req.json();
  
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