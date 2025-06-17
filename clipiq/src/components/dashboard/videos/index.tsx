"use client";
import { getUserVideos } from "@/app/actions/workspace";
import VideoCard from "@/components/dashboard/videos/video-card";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { VideosProps } from "@/types/index.type";
import { SortAsc, Video } from "lucide-react";
import React from "react";
type props = {
  workspaceId: string;
  folderId: string;
  queryKey:string
};

const Videos = ({ workspaceId, folderId,queryKey }: props) => {
  const { data, isPending } = useQueryData([queryKey], () =>
    getUserVideos(folderId)
  );
  console.log(data)
  const { status, data: videos } = data as VideosProps;

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Video fill="#868686" className="text-[#868686]" />
          <h2 className="text-[#BdBdBd] text-xl">Videos</h2>
        </div>
        <span className="text-[#8d8d8d] cursor-pointer items-center text-md flex flex-row ">
          <SortAsc height={15} className="text-[#8d8d8d]" />
          Sort
        </span>
      </div>
      <Separator/>
      <section
        className={cn(
          status !== 200
            ? "p-5"
            : "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        )}
      >
        {status === 200 ? (
          videos.map((video) => (
            <VideoCard key={video.id} video={{ ...video, workspaceId }} />
          ))
        ) : (
          <p className="text-[#BDBDBD]"> No videos in workspace</p>
        )}
      </section>
    </div>
  );
};

export default Videos;
