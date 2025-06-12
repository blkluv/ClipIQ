import { getVideoDetails } from "@/app/actions/workspace";
import VideoPreview from "@/components/dashboard/videos/video-preview";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
type props = {
  params: {
    videoId: string;
  };
};
const page = async ({ params }: props) => {
  const { videoId } = await params;
  const client = new QueryClient();
  await client.prefetchQuery({
    queryKey: ["video-data"],
    queryFn: async () => getVideoDetails(videoId),
  });

  return <HydrationBoundary state={dehydrate(client)}>
    <VideoPreview videoId={videoId}/>
  </HydrationBoundary>;
};

export default page;
