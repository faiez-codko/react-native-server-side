import { db } from "@/lib/prismadb";
import { PageForm } from "./_components/page-form";

export default async function PageIdPage({
  params
}: {
  params: Promise<{ pageId: string }>
}) {
  const { pageId } = await params;
  const page = await db.page.findUnique({
    where: {
      id: pageId
    }
  });

  if (!page) {
    return <div>Page not found</div>;
  }

  return ( 
    <div className="p-6">
        <PageForm initialData={page} />
    </div>
   );
}
