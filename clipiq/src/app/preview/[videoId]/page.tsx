import { getUserProfile, onAuthenticated } from "@/app/actions/user";
import { getVideoComments, getVideoDetails } from "@/app/actions/workspace";
import VideoPreview from "@/components/dashboard/videos/video-preview";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";
type props = {
  params: {
    videoId: string;
  };
};
const page = async ({ params }: props) => {
  const auth =await onAuthenticated();
    //  if(auth.status === 200 || auth.status === 201){
    //       return redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    //   }
     if(auth.status==403 || auth.status==400 || auth.status==500 || auth.status==400) {
        return redirect('/auth/sign-in');
      }
  const { videoId } = await params;
  const client = new QueryClient();
  await client.prefetchQuery({
    queryKey: ["video-data"],
    queryFn: async () => getVideoDetails(videoId),
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
