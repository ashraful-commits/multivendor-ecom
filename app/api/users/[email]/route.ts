import db from './../../../../lib/db';
import {NextResponse} from "next/server"
//import { NextApiRequest, NextApiResponse } from 'next';
 
export async function GET(req:Request,{params:{email}}:{params:{email:string}}) {
  try {
    const user = await db.user.findUnique({
      where:{
        email,role:"USER"
      }
    })
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Failed to fetch user",
      error,
    }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
  
    if (!req.body) {
      throw new Error('Request body is missing');
    }
    const { token, id } = await req.json();
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          data: null,
          message: "No User Found",
        },
        { status: 404 }
      );
    }
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        emailVerified: true,
        verificationRequestCount: parseInt(user.verificationRequestCount) + 1,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Update User",
        error,
      },
      { status: 500 }
    );
  }
}