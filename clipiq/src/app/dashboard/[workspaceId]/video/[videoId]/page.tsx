import { getUserProfile } from "@/app/actions/user";
import { getVideoComments, getVideoDetails } from "@/app/actions/workspace";
import VideoPreview from "@/components/dashboard/videos/video-preview";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
type props = {
  params: Promise<{
    videoId: string;
  }>;
};
const page = async ({ params }: props) => {
  const { videoId } = await params;
  const client = new QueryClient();
  await client.prefetchQuery({
    queryKey: ["video-data"],
    queryFn: () => getVideoDetails(videoId),
  });
  await client.prefetchQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfile(),
  });
  await client.prefetchQuery({
    queryKey: ["video-comments"],
    queryFn: () => getVideoComments(videoId),
  });

  return <HydrationBoundary state={dehydrate(client)}>
    <VideoPreview videoId={videoId}/>
  </HydrationBoundary>;
};

export default page;
