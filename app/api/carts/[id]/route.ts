import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const carts = await db.cart.findMany({
      where: {
        userId: id,
        status:true,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(carts);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch cart", error },
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
    const deleteUser = await db.cart.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteUser);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      { message: "Failed to delete cart", error },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { quantity,total }:{quantity:number;total:number} = await req.json();
    //console.log(id,quantity)
    const cartItem = await db.cart.findUnique({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ message: "Cart item not found" }, { status: 404 });
    }

    await db.cart.update({
      where: {
        id,
      },
      data: {
        quantity,
        total,
      },
    });

    return NextResponse.json({ message: "Cart item quantity updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update cart item quantity", error }, { status: 500 });
  }
}