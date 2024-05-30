import { NextResponse } from "next/server";
import db from "@/lib/db";

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  image: string; // or whatever type image is
}
export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }

    const { data }: { data: UserData[] } = await req.json();

    const emails = data.map((user) => user.email);

    const existingcustomers = await db.user.findMany({
      where: {
        email: {
          in: emails,
        },
      },
    });

    const uniqueData = data.filter(
      (user) =>
        !existingcustomers.some((existingcustomer:any) => existingcustomer.email === user.email)
    );

    const newcustomers = await db.user.createMany({
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
