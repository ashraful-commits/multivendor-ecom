import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const notificationData = await db.notification.findMany({
      where: {
        userId: id,
      },
      take:10,
      include:{
        user:true
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notificationData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch notification", error },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const deleteUser = await db.notification.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteUser);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      { message: "Failed to delete notification", error },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { notification }:{notification:{id:string;read:boolean};} = await req.json();

    const notificationItem = await db.notification.findUnique({
      where: {
        id,
      },
    });

    if (!notificationItem) {
      return NextResponse.json({ message: "notification item not found" }, { status: 404 });
    }

    await db.notification.update({
      where: {
        id,
      },
      data: {
        read:notification.read
      },
    });

    return NextResponse.json({ message: "notification item quantity updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update notification item quantity", error }, { status: 500 });
  }
}