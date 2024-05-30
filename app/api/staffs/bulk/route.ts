import { NextResponse } from "next/server";
import db from "@/lib/db";
interface staffData {
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
export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }

    const { data }: { data: staffData[] } = await req.json();

    const emails = data.map((staff) => staff.email);

    const existingcustomers = await db.staff.findMany({
      where: {
        email: {
          in: emails,
        },
      },
    });

    const uniqueData = data.filter(
      (staff) =>
        !existingcustomers.some((existingcustomer:any) => existingcustomer.email === staff.email)
    );

    const newcustomers = await db.staff.createMany({
      data: uniqueData,
    });

    return NextResponse.json(newcustomers);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create customers",
        error,
      },
      { status: 500 }
    );
  }
}
