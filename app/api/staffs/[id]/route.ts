import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { imageRemove } from './../../../../lib/ImageRemove';
import bcryptjs from 'bcryptjs';


interface staffType {
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
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const staffId = params.id;

    const staff = await db.staff.findUnique({
      where: {
        id: staffId,
      },
    });

    if (!staff) {
      return NextResponse.json({ msg: "staff not found" }, { status: 404 });
    }

    return NextResponse.json(staff);
  } catch (error) {
    console.error(error);
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
    const staffId = params.id;
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
    }: staffType = await req.json();

    const existingStaff = await db.staff.findUnique({
      where: {
        id: staffId,
      },
    });

    if (existingStaff) {
      const hashPassword = (password: string): string => {
        const saltRounds = 10;
        return bcryptjs.hashSync(password, saltRounds);
      };
      const updatedStaff = await db.staff.update({
        where: {
          id: staffId,
        },
        data: {phone,name,email,password:hashPassword(password),address,description,notes,imgUrl,idNumber,dob,code,isActive  },
      });

      return NextResponse.json(updatedStaff);
    } 
  } catch (error) {

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
    const staffId = params.id;
    const deleteStaff = await db.staff.delete({
      where: {
        id: staffId,
      },
    });

   if(deleteStaff){
   await imageRemove(deleteStaff.imgUrl)
   }
    return NextResponse.json(deleteStaff);
    
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
