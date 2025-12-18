import { NextResponse } from "next/server";
import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const { pageId } = await params;

    const page = await db.page.findUnique({
      where: {
        id: pageId
      }
    });

    return NextResponse.json(page);
  } catch (error) {
    console.log("[PAGE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "SUPER_ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { pageId } = await params;
    const values = await req.json();

    const page = await db.page.update({
      where: {
        id: pageId,
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(page);
  } catch (error) {
    console.log("[PAGE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "SUPER_ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { pageId } = await params;

    const page = await db.page.delete({
      where: {
        id: pageId,
      }
    });

    return NextResponse.json(page);
  } catch (error) {
    console.log("[PAGE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
