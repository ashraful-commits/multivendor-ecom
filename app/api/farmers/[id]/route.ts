import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { imageRemove } from './../../../../lib/ImageRemove';

interface FarmerType {
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
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const farmerId = params.id;
    const farmer = await db.farmerprofile.findUnique({
      where: {
        id: farmerId,
      },
    });

    if (!farmer) {
      console.log('Farmer not found for ID:', farmerId);
      return NextResponse.json({ error: 'Farmer not found' }, { status: 404 });
    }

    return NextResponse.json(farmer);
  } catch (error) {
    console.error('Error fetching farmer:', error);
    return NextResponse.json(
      {
        msg: error,
      },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const farmerId = params.id;
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
    }: FarmerType = await req.json();
    const existingFarmer = await db.farmerprofile.findUnique({
      where: {
        id: farmerId,
      },
    });
    if (existingFarmer) {
      const updatedFarmer = await db.farmerprofile.update({
        where: {
          id: farmerId,
        },
        data: {phone,
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
          productIds },
      });

      return NextResponse.json(updatedFarmer);
    } 
  } catch (error) {
console.log(error)
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const farmerId = params.id;
    const deleteFarmer = await db.farmerprofile.delete({
      where: {
        id: farmerId,
      },
    });

   if(deleteFarmer){
   await imageRemove(deleteFarmer.imgUrl)
   }
    return NextResponse.json(deleteFarmer);
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
