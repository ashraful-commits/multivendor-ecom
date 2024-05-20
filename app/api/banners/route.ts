import { NextResponse } from "next/server";
import db from './../../../lib/db';
//import { NextApiRequest, NextApiResponse } from 'next';
interface bannerData  { title: string; link: string; imgUrl: string | null; isActive: boolean }
export async function POST(req: Request) {
  try {
    if (!req.body) {
      throw new Error('Request body is missing');
    }

    const { title, link, imgUrl, isActive }:bannerData = await req.json();
    const newBanner = await db.banner.create({
      data: { title, link, imgUrl, isActive }
    });
    console.log(newBanner);
    return NextResponse.json(newBanner);
  } catch (error) {
    return NextResponse.json({ message: "Failed to create Banners", error }, { status: 500 });
  }
}

//========================get banner
export async function GET() {
  try {
    const banners = await db.banner.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(banners);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch banner", error }, { status: 500 });
  }
}
