// app/dashboard/[workspaceId]/page.tsx

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PageParams = { params: { workspaceId: string } };

export default async function DashboardHome({ params }: PageParams) {
    const { workspaceId } =await params;
  return (
    <div>
      <Tabs>
        <div className="flex w-full justify-between items-center">
        <TabsList className='bg-transparent gap-2 pl-0'>
          <TabsTrigger value="videos" className='p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]'>Videos</TabsTrigger>
          <TabsTrigger value="archive" className='p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]'>Archive</TabsTrigger>
        </TabsList>
        </div>
      </Tabs>
    </div>
  );
}
