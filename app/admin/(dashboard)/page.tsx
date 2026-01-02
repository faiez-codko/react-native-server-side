import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AppWindow, Globe } from "lucide-react";
import { db } from "@/lib/prismadb";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const appsCount = await db.app.count();
  const pagesCount = await db.page.count();
  const publishedPagesCount = await db.page.count({
    where: {
      isPublished: true,
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Apps
            </CardTitle>
            <AppWindow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appsCount}</div>
            <p className="text-xs text-muted-foreground">Active applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pages
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagesCount}</div>
            <p className="text-xs text-muted-foreground">Pages across all apps</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Published Pages
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedPagesCount}</div>
            <p className="text-xs text-muted-foreground">Live pages available publicly</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
