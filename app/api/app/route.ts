import { NextResponse } from "next/server";
import { db } from "@/lib/prismadb";

export async function GET() {
  try {
    const pages = await db.app.findMany({
      select: {
        id: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
  
        // We exclude content/transpiled_code from the list to keep payload small
        // If the user needs full content, they should fetch by slug
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.log("[PAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
