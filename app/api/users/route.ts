import { NextResponse } from 'next/server';
import db from './../../../lib/db';
import bcryptjs from 'bcryptjs';
import { EmailTemplate } from './../../../components/backend/EmailTemplate';
import {Resend} from "resend"
import { v4 as uuidv4 } from 'uuid';
import { imageRemove } from '@/lib/ImageRemove';
import base64url from 'base64url';

 interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  image: string; // or whatever type image is
}
export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
   
    if (!req.body) {
      throw new Error('Request body is missing');
    }
    const { name, email, password, role, image }: UserData = await req.json();
    
    //Check if the user Already exists in the db
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `User with this email ( ${email})  already exists in the Database`,
        },
        { status: 409 }
      );
    }
    // Encrypt the Password =>bcrypt
    const hashedPassword = await bcryptjs.hash(password, 10);

    //Generate Token
    // Generate a random UUID (version 4)
    const rawToken = uuidv4();

    // Encode the token using Base64 URL-safe format
    const token = base64url.encode(rawToken);
    // Create a User in the DB
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password:hashedPassword,
        role,
        verificationToken: token,
        image,
      },
    });

    //Send an Email with the Token on the link as a search param
    const userId = newUser.id;
    const linkText = "Verify Account";
    const redirectUrl = `login?token=${token}&id=${userId}`;
    const sendMail = await resend.emails.send({
      from: "multivendor <beautifulmind429@gmail.com>",
      to: email,
      subject: "Account Verification from Auth System",
      react: EmailTemplate({ name, redirectUrl, linkText }),
    });


    return NextResponse.json(
      {
        data: newUser,
        message: "User Created Successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Server Error: Something went wrong",
      },
      { status: 500 }
    );
  }
}
//========================get banner
export async function GET() {
  try {
    const users = await db.user.findMany({
      orderBy:{
        createdAt:"desc"
      }
    })
    return NextResponse.json(users);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      message: "Failed to fetch users",
      error,
    }, { status: 500 });
  }
}

export async function DELETE(req:Request) {
  try {
    const { Ids }:{Ids:string[]} = await req.json();
    const deletedUser = await db.user.deleteMany({
      where: {
        id: {
          in: Ids
        }
      }
    });
    if(deletedUser){
      deletedUser.map(async(item:any)=>{
        await imageRemove(item.imgUrl);
      })
    }
    return NextResponse.json(deletedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete users", error }, { status: 500 });
  }
}