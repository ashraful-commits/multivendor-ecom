import { NextResponse } from "next/server";
import db from './../../../lib/db';

interface NotificationData {
  userId: string;
  message: number;
  total: number;
}

export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error('Request body is missing');
    }
    const { userId,message }: NotificationData = await req.json();

    const existInNotification = await db.notification.findFirst({
      where: {
        userId,
        message,
      },
    });

    if (existInNotification) {
      const deleteNotification = await db.notification.delete({
        where: { id: existInNotification.id }
      });
      return NextResponse.json({msg:"Removed to Notification"});
    } else {
      const newNotification = await db.notification.create({
        data: {  userId, message },
      });
      return NextResponse.json(newNotification);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create/update Notification", error }, { status: 500 });
  }
}
