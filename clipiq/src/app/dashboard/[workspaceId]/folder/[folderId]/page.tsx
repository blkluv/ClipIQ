import { getFolderInfo, getUserVideos } from "@/app/actions/workspace";
import FolderInfo from "@/components/dashboard/Folders/folder-info";
import Videos from "@/components/dashboard/videos";
import { useQueryData } from "@/hooks/useQueryData";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

type props = {
  params: {
    workspaceId: string;
    folderId: string;
  };
};
const FolderID = async ({ params }: props) => {
  const { workspaceId, folderId } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["folder"],
    queryFn: () => getFolderInfo(folderId),
  });
   await queryClient.prefetchQuery({
        queryKey: ['folder-videos'],
        queryFn: () => getUserVideos(folderId)
    })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FolderInfo folderId={folderId}/>
      <Videos workspaceId={workspaceId} folderId={folderId}/>
    </HydrationBoundary>
  )
};

export default FolderID;
