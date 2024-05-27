import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { imageRemove } from "./../../../../lib/ImageRemove";

interface customerType {
  lastName: string;
  firstName: string;
  email: string;
  phone:string;
  streetAddress:string;
  city:string;
  country:string;
  zipCode:string;

}
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = params.id;
    const customerData = await db.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    return NextResponse.json(customerData);
  } catch (error) {
    return NextResponse.json(
      {
        msg: error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = params.id;
    const {
      lastName,
firstName,
email,
phone,
streetAddress,
city,
country,
zipCode,
    }: customerType = await req.json();

    const existingCustomer = await db.customer.findUnique({
      where: {
        id: customerId,
      },
    });
    if (existingCustomer) {
      const updatedCustomer = await db.customer.update({
        where: {
          id: customerId,
        },
        data: {
          lastName,
firstName,
email,
phone,
streetAddress,
city,
country,
zipCode,
        },
      });

      return NextResponse.json(updatedCustomer);
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
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = params.id;
    const deleteCustomer = await db.customer.delete({
      where: {
        id: customerId,
      },
    });

    if (deleteCustomer) {
      await imageRemove(deleteCustomer.imgUrl);
    }
    return NextResponse.json(deleteCustomer);
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
