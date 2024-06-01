import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { PusherServer } from '../../../../lib/pusher';

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
    console.log(error);
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
    const { status }: { status: string } = await req.json();

    const orderItem = await db.order.findUnique({
      where: { id }
    });

    if (!orderItem) {
      return NextResponse.json({ message: "Order item not found" }, { status: 404 });
    }

    const updatedOrder = await db.order.update({
      where: { id },
      data: { status },
    });

    if (orderItem.status === "COMPLATE" && status !== "COMPLATE") {
      const cartItemsUpdatePromises = orderItem.cartItems.map(async (cartItem:any) => {
        const cartDetails = await db.cart.findFirst({
          where: { id: cartItem.id },
        });
        if (cartDetails) {
          const product = await db.product.findFirst({
            where: { id: cartDetails.productId },
          });
          if (product) {
            if(product.sales>0){
              const newStock = product.stock + cartDetails.quantity;
              const newSales = product.sales - cartDetails.quantity;
  
              if (typeof newStock === 'number' && typeof newSales === 'number') {
                await db.product.update({
                  where: { id: product.id },
                  data: {
                    stock: newStock,
                    sales: newSales,
                  },
                });
              }
            }
           
          }
        }
      });
      await Promise.all(cartItemsUpdatePromises);
    } else if (orderItem.status !== "COMPLATE" && status === "COMPLATE") {
      const cartItemsUpdatePromises = orderItem.cartItems.map(async (cartItem:any) => {
        const cartDetails = await db.cart.findFirst({
          where: { id: cartItem.id },
        });
        
        if (cartDetails) {
          const product = await db.product.findFirst({
            where: { id: cartDetails.productId },
          });
          if (product) {
            const newStock = product.stock - cartDetails.quantity;
            const newSales = product.sales + cartDetails.quantity;
          
            if (typeof newStock === 'number' && typeof newSales === 'number') {
              await db.product.update({
                where: { id: product.id },
                data: {
                  stock: newStock,
                  sales: newSales,
                },
              });
            }
          }
        }
      });
      await Promise.all(cartItemsUpdatePromises);
    }
    if (orderItem?.userId && status==="COMPLATE") {
      try {
        await PusherServer.trigger(orderItem.userId, 'new-message', 'Your order is completed');
        console.log("Pusher event triggered successfully");
      } catch (error) {
        console.error("Error triggering Pusher event:", error);
      }
    }if (orderItem?.userId && status==="CENCEL") {
      try {
        await PusherServer.trigger(orderItem.userId, 'new-message', 'Your order is cencel');
        console.log("Pusher event triggered successfully");
      } catch (error) {
        console.error("Error triggering Pusher event:", error);
      }
    }if (orderItem?.userId && status==="PROCESS") {
      try {
        await PusherServer.trigger(orderItem.userId, 'new-message', 'Your order is processing');
        console.log("Pusher event triggered successfully");
      } catch (error) {
        console.error("Error triggering Pusher event:", error);
      }
    }if (orderItem?.userId && status==="PENDING") {
      try {
        await PusherServer.trigger(orderItem.userId, 'new-message', 'Your order is pending');
        console.log("Pusher event triggered successfully");
      } catch (error) {
        console.error("Error triggering Pusher event:", error);
      }
    } else {
      console.error("Error: orderItem.userId is undefined");
    }
    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update Order", error }, { status: 500 });
  }
}

