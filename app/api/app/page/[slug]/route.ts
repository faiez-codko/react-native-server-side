import { NextResponse } from "next/server";
import { db } from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const appSlug = searchParams.get("appSlug");

    if (!appSlug) {
      return new NextResponse("App Slug is required", { status: 400 });
    }

    const app = await db.app.findUnique({
      where: {
        slug: appSlug,
      },
    });

    if (!app) {
      return new NextResponse("App not found", { status: 404 });
    }

    const page = await db.page.findUnique({
      where: {
        appId_slug: {
          appId: app.id,
          slug: slug,
        },
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
      return new NextResponse("Page Not Found", { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.log("[PAGE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
