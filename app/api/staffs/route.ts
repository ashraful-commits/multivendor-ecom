
import {NextResponse} from "next/server"
import db from './../../../lib/db';
import bcryptjs from "bcryptjs"
interface YourDataInterface {
  phone: string;
  email: string;
  password: string;
  name: string;
  address: string;
  description: string;
  notes: string;
  imgUrl: string;
  idNumber: string;
  dob: string; // or whatever type dob is
  code: string;
  isActive: boolean;
}
export async function POST (req: Request){
try {
  
  if (!req.body) {
    throw new Error('Request body is missing');
  }
  const { 
    phone,
    email,
    password,
    name,
    address,
    description,
    notes,
    imgUrl,
    idNumber,
    dob,
    code,
    isActive,
  }: YourDataInterface = await req.json();
  

  const existStaff = await db.staff.findUnique({
    where:{
      email,name
    }
  })
  if(existStaff){
    return NextResponse.json({
      data:null,
      message:"staff already exist"
    },{status:409})
  }
  const hashPassword = await bcryptjs.hash(password, 10);

    const newStaff = await db.staff.create({
      data:{
        phone,name,email,password:hashPassword,address,description,notes,imgUrl,idNumber,dob,code,isActive
      }
    })
  return NextResponse.json(newStaff)
} catch (error) {
  //console.log(error)
  return NextResponse.json({
    message:"Failed to create staff",
    error
  },{status:500})
}
}

export async function GET() {
  try {
    const staffs = await db.staff.findMany({
      orderBy:{
        createdAt:"desc"
      }
    })
    return NextResponse.json(staffs);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      message: "Failed to fetch farmer",
      error,
    }, { status: 500 });
  }
}