import { db } from "@/lib/prismadb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function PagesPage() {
  const pages = await db.page.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Pages</h1>
            <Link href="/admin/pages/create">
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
                    No pages found.
                </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}
