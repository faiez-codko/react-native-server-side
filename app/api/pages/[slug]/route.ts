import { NextResponse } from "next/server";
import { db } from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const page = await db.page.findUnique({

      where: {
        slug: slug,
        isPublished: true,
      },

      select: {
        id: true,
        slug: true,
        title: true,
        transpiled_code: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!page) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.log("[PAGE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
