import { NextResponse } from 'next/server';
import db from './../../../lib/db';
interface YourDataInterface {
  phone: string;
  email: string;
  address: string;
  contact: string; // or whatever type contact is
  uniqueCode: string;
  description: string;
  terms: string;
  notes: string;
  imgUrl: string;
  isActive: boolean;
  landSize: number; // or whatever type landSize is
  mainCrop: string; // or whatever type mainCrop is
  name: string;
  productIds: string[]; // or whatever type productIds is
}
export async function POST(req: Request) {
  try {
    
    if (!req.body) {
      throw new Error('Request body is missing');
    }
    const { 
      phone,
      email,
      address,
      contact,
      uniqueCode,
      description,
      terms,
      notes,
      imgUrl,
      isActive,
      landSize,
      mainCrop,
      name,
      productIds,
    }: YourDataInterface = await req.json();
    
    const farmerProfile = await db.farmerprofile.findUnique({
      where: {
        uniqueCode,
      },
    });

    if (farmerProfile) {
      return NextResponse.json(
        { data: null, message: 'Farmer already exist!' },
        { status: 409 },
      );
    }
    const farmerDetails = await db.user.findUnique({where:{email}})
    if(farmerDetails){
      const newFarmer = await db.farmerprofile.create({
        data: {
          phone,
          email,
          address,
          contact,
          uniqueCode,
          description,
          terms,
          notes,
          imgUrl,
          isActive,
          landSize,
          mainCrop,
          name,
          user: { connect: { id: farmerDetails?.id } },
          products: {
            connect: productIds.map((productId) => ({ id: productId })),
          }
        },
      });
  
      return NextResponse.json(newFarmer);
    }
   
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Failed to create Farmer',
        error,
      },
      { status: 500 },
    );
  }
}
export async function GET() {
  try {
    const farmerprofile = await db.farmerprofile.findMany({
      orderBy:{
        createdAt:"desc"
      }
    })
    return NextResponse.json(farmerprofile);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      message: "Failed to fetch farmer",
      error,
    }, { status: 500 });
  }
}