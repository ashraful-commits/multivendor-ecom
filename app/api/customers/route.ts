
import {NextResponse} from "next/server"
import db from './../../../lib/db';
import { imageRemove } from '@/lib/ImageRemove';
interface customerType {
  lastName: string;
  firstName: string;
  email: string;
  phone:string;
  streetAddress:string;
  city:string;
  country:string;
  zipCode:string;

}
export async function POST (req: Request){
try {
 
  if (!req.body) {
    throw new Error('Request body is missing');
  }
  const { lastName,
    firstName,
    email,
    phone,
    streetAddress,
    city,
    country,
    zipCode }: customerType = await req.json();
  


    const newCustomer = await db.customer.create({
      data:{
      lastName,
    firstName,
    email,
    phone,
    streetAddress,
    city,
    country,
    zipCode
      }
    })
    return NextResponse.json(newCustomer)
  

} catch (error) {
  console.log(error)
  return NextResponse.json({
    message:"Failed to create Customer",
    error
  },{status:500})
}
}

export async function GET() {
  try {
    const Customer = await db.customer.findMany({
      orderBy:{
        createdAt:"desc"
      }
    })
    return NextResponse.json(Customer);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      message: "Failed to fetch Customer",
      error,
    }, { status: 500 });
  }
}
export async function DELETE(req:Request) {
  try {
    const { Ids }:{Ids:string[]} = await req.json();
    const deletedCustomer = await db.customer.deleteMany({
      where: {
        id: {
          in: Ids
        }
      }
    });
    if(deletedCustomer){
      deletedCustomer?.map(async(item:any)=>{
        await imageRemove(deletedCustomer.imgUrl)
      })
    }
    return NextResponse.json(deletedCustomer);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete users", error }, { status: 500 });
  }
}