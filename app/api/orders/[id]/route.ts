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

    if (orderItem?.status === "COMPLETE" && status !== "COMPLETE") {
      const cartItemsUpdatePromises = orderItem?.cartItems.map(async (cartItem:any) => {
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
    } else if (orderItem?.status !== "COMPLETE" && status === "COMPLETE") {
      const cartItemsUpdatePromises = orderItem?.cartItems.map(async (cartItem:any) => {
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
    if (orderItem?.userId && status==="COMPLETE") {
      try {
        const completeData=  await db.notification.create({
             include:{
              user:true
             },
          data:{
            userId:orderItem?.userId,
            message:"your order is complete"
          }
        })
        if(completeData){
          await PusherServer.trigger(completeData?.userId, 'new-order', completeData);
        }
        console.log("Pusher event triggered successfully");
      } catch (error) {
        console.error("Error triggering Pusher event:", error);
      }
    }if (orderItem?.userId && status==="CANCEL") {
      try {
      const cancelData=  await db.notification.create({
           include:{
            user:true
           },
          data:{
            userId:orderItem.userId,
            message:"your order is cancel"
          }
        })
        if(cancelData){

          await PusherServer.trigger(cancelData?.userId, 'new-order', cancelData);
        }
      } catch (error) {
        console.error("Error triggering Pusher event:", error);
      }
    }if (orderItem?.userId && status==="PROCESS") {
      try {
        const processData=  await db.notification.create({
             include:{
              user:true
             },
          data:{
            userId:orderItem.userId,
            message:"your order is processing"
          }
        })
        if(processData){
          await PusherServer.trigger(processData?.userId, 'new-order', processData);
        }
      } catch (error) {
        console.error("Error triggering Pusher event:", error);
      }
    }if (orderItem?.userId && status==="PENDING") {
      try {
        const pendingData=  await db.notification.create({
             include:{
              user:true
             },
          data:{
            userId:orderItem.userId,
            message:"your order is pending"
          }
        })
        if(pendingData){

          await PusherServer.trigger(pendingData?.userId, 'new-order', pendingData);
        }

      } catch (error) {
        console.error("Error triggering Pusher event:", error);
      }
    } else {
      console.error("Error:  undefined");
    }
    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update Order", error }, { status: 500 });
  }
}

