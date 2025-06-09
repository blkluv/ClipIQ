// app/dashboard/[workspaceId]/page.tsx

import CreateFolders from "@/components/dashboard/create-folders";
import CreateWorkSpace from "@/components/dashboard/create-workspace";
import Folders from "@/components/dashboard/Folders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PageParams = { params: { workspaceId: string } };

export default async function DashboardHome({ params }: PageParams) {
  const { workspaceId } = await params;
  return (
    <div>
      <Tabs defaultValue="videos" className="mt-6">
        <div className="flex w-full justify-between items-center">
          <TabsList className="bg-transparent gap-2 pl-0">
            <TabsTrigger
              value="videos"
              className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="archive"
              className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
            >
              Archive
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-3">
            <CreateWorkSpace/>
            <CreateFolders/>
          </div>
        </div>
        <section className="py-9">
          <TabsContent value='videos'>
            <Folders workspaceId={workspaceId} />
          </TabsContent>
        </section>
      </Tabs>
    </div>
  );
}
