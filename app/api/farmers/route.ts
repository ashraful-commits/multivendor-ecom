import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { imageRemove } from '@/lib/ImageRemove';
interface farmerData {
  phone: string;
  email: string;
  address: string;
  contact: string; 
  uniqueCode: string;
  description: string;
  terms: string;
  notes: string;
  imgUrl: string;
  isActive: boolean;
  landSize: number; 
  mainCrop: string; 
  name: string;
  productIds: string[]; 
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
    }: farmerData = await req.json();
    
    const farmerProfile = await db.farmerProfile.findUnique({
      where: {
        email,
      },
    });

    if (farmerProfile) {
      return NextResponse.json(
        { data: null, message: 'Farmer already exists!' },
        { status: 409 },
      );
    } else {
      const farmerDetails = await db.user.findUnique({ where: { email } });
      if (farmerDetails) {
        const newFarmer = await db.farmerProfile.create({
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
            user: { connect: { id: farmerDetails.id } },
            productIds
          },
        });
    
        return NextResponse.json(newFarmer);
      }
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
    const farmerProfile = await db.farmerProfile.findMany({
      orderBy:{
        createdAt:"desc"
      }
    })
    return NextResponse.json(farmerProfile);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      message: "Failed to fetch farmer",
      error,
    }, { status: 500 });
  }
}
export async function DELETE(req:Request) {
  try {
    const { Ids }:{Ids:string[]} = await req.json();
    const deletedFarmer = await db.farmer.deleteMany({
      where: {
        id: {
          in: Ids
        }
      }
    });
    if(deletedFarmer){
      deletedFarmer?.map(async(item:any)=>{
        await imageRemove(deletedFarmer.imgUrl)
      })
    }
    return NextResponse.json(deletedFarmer);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete users", error }, { status: 500 });
  }
}