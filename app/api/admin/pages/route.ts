import { NextResponse } from "next/server";
import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "SUPER_ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title } = await req.json();

    if (!title) {
        return new NextResponse("Title is required", { status: 400 });
    }
    
    // Generate slug
    let slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    
    // Check for duplicate slug
    let slugExists = await db.page.findUnique({
        where: { slug }
    });
    
    let count = 1;
    while (slugExists) {
        const newSlug = `${slug}-${count}`;
        slugExists = await db.page.findUnique({
            where: { slug: newSlug }
        });
        if (!slugExists) {
            slug = newSlug;
        }
        count++;
    }

    const page = await db.page.create({
      data: {
        title,
        slug,
      }
    });

    return NextResponse.json(page);
  } catch (error) {
    console.log("[PAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
    try {
        const user = await getCurrentUser();
        if (!user || user.role !== "SUPER_ADMIN") {
             return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const pages = await db.page.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        
        return NextResponse.json(pages);
    } catch (error) {
        console.log("[PAGES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
