import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcryptjs from "bcryptjs";
import { imageRemove } from "@/lib/ImageRemove";
interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  image: string;
}

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch user",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const { name, email, password, role, image }: UserData = await req.json();
    console.log(name, email, password, role, image);
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const userUpdate = await db.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          imgUrl: image,
        },
      });
      return NextResponse.json(userUpdate);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch user",
        error,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      const deleteUser = await db.user.delete({
        where: {
          id,
        },
      });
      if (deleteUser) {
        await imageRemove(deleteUser.imgUrl);
      }
      return NextResponse.json(deleteUser);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch user",
        error,
      },
      { status: 500 }
    );
  }
}
