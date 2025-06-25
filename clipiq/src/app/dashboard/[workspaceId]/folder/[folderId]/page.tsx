import { getFolderInfo, getUserVideos } from "@/app/actions/workspace";
import FolderInfo from "@/components/dashboard/Folders/folder-info";
import Videos from "@/components/dashboard/videos";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

type Props = {
  params: Promise<{
    folderId: string;
    workspaceId: string;
  }>;
};


const FolderID = async ({ params }: Props) => {
  const { folderId, workspaceId } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["folder"],
    queryFn: () => getFolderInfo(folderId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["folder-videos"],
    queryFn: () => getUserVideos(folderId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FolderInfo folderId={folderId} />
      <Videos
        workspaceId={workspaceId}
        folderId={folderId}
        queryKey="folder-videos"
      />
    </HydrationBoundary>
  );
};

export default FolderID;