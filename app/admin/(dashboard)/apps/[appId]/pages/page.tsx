import { db } from "@/lib/prismadb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function AppPagesPage({
  params
}: {
  params: Promise<{ appId: string }>
}) {
  const { appId } = await params;

  const app = await db.app.findUnique({
    where: { id: appId },
  });

  if (!app) {
    return redirect("/admin/apps");
  }

  const pages = await db.page.findMany({
    where: {
      appId: appId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-x-4">
                <Link href="/admin/apps" className="hover:opacity-75 transition">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <div className="flex flex-col gap-y-1">
                    <h1 className="text-2xl font-bold">{app.name} Pages</h1>
                    <span className="text-sm text-muted-foreground">
                        Manage pages for this application
                    </span>
                </div>
            </div>
            <Link href={`/admin/apps/${appId}/pages/create`}>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Page
                </Button>
            </Link>
        </div>
      
      <div className="border rounded-md bg-white dark:bg-slate-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <TableRow key={page.id}>
              <TableCell className="font-medium">{page.title}</TableCell>
              <TableCell>{page.slug}</TableCell>
              <TableCell>{page.isPublished ? "Yes" : "No"}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(page.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/pages/${page.id}`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {pages.length === 0 && (
            <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                    No pages found for this app.
                </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}
