import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const orders = await db.order.findUnique({
      where:{
        id
      }
      
    });

    return NextResponse.json(orders);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch order", error },
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
    const deleteUser = await db.order.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteUser);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      { message: "Failed to delete order", error },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { status }:{status:string;} = await req.json();
  console.log(id,status)
    const orderItem = await db.order.findUnique({
      where: {
        id,
      },
    });

    if (!orderItem) {
      return NextResponse.json({ message: "Order item not found" }, { status: 404 });
    }

    await db.order.update({
      where: {
        id,
      },
      data: {
       status
      },
    });

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update Order", error }, { status: 500 });
  }
}