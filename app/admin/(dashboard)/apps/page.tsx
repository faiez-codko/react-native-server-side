import { db } from "@/lib/prismadb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, AppWindow } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function AppsPage() {
  const apps = await db.app.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: { pages: true }
      }
    }
  });

  return (
    <div className="p-6">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Applications</h1>
            <Link href="/admin/apps/create">
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New App
                </Button>
            </Link>
        </div>
      
      <div className="border rounded-md bg-white dark:bg-slate-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Pages</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium flex items-center gap-2">
                <AppWindow className="h-4 w-4 text-blue-500" />
                {app.name}
              </TableCell>
              <TableCell>{app.slug}</TableCell>
              <TableCell>{app._count.pages}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(app.createdAt)}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Link href={`/admin/apps/${app.id}/pages`}>
                    <Button variant="secondary" size="sm">Manage Pages</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {apps.length === 0 && (
            <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                    No apps found. Create one to get started.
                </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}
