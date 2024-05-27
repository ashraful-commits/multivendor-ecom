import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { imageRemove } from '../../../../lib/ImageRemove';


type BannerData = {
  title: string;
  link: string;
  imgUrl: string;
  isActive: boolean;
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bannerId = params.id;

    const banner = await db.banner.findUnique({
      where: {
        id: bannerId,
      },
    });

    if (!banner) {
      return NextResponse.json({ msg: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json(banner);
  } catch (error) {
 
    return NextResponse.json(
      {
        msg: error
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
    const bannerId = params.id;
    const { title, link, imgUrl, isActive }: BannerData = await req.json();

    const existingBanner = await db.banner.findUnique({
      where: {
        id: bannerId,
      },
    });

    if (existingBanner) {
      const updatedBanner = await db.banner.update({
        where: {
          id: bannerId,
        },
        data: { title, link, imgUrl, isActive },
      });

      return NextResponse.json(updatedBanner);
    } else {
      return NextResponse.json(
        { message: "Banner not found" },
        { status: 404 }
      );
    }
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
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bannerId = params.id;

    const deleteBanner = await db.banner.delete({
      where: {
        id: bannerId,
      },
    });
    
    if (deleteBanner) {
      await imageRemove(deleteBanner.imgUrl)
    }
    return NextResponse.json(deleteBanner);
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