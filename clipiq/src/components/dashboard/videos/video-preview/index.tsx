"use client";
import { getVideoDetails } from "@/app/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { VideoDataProps } from "@/types/index.type";
import { Separator } from "@radix-ui/react-select";
import { Download } from "lucide-react";
import React from "react";
import CopyLink from "../copy-link";
import RichLink from "./rich-link";
import { truncateString } from "@/lib/utils";
import TabMenu from "./tabs";
import AITools from "./tools/ai-tools";
import VideoTranscript from "./tools/video-transcipt";
import Activities from "@/components/activities";
import EditVideo from "./edit-video";

type props = {
  videoId: string;
};
const VideoPreview = ({ videoId }: props) => {
  const { data } = useQueryData(["video-data"], () => getVideoDetails(videoId));
  const { data: video, author } = data as VideoDataProps;
  console.log(video);

  const daysAgo = Math.floor(
    (new Date().getTime() - video.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );
  return (
    <div className="md:mt-12 mt-22 mx-2 grid grid-cols-1 xl:grid-cols-3 lg:py-10 scrollbar-hidden overflow-y-auto gap-5">
      <div className="flex flex-col lg:col-span-2 gap-y-10 md:gap-y-10">
        <div>
          <div className="flex gap-x-5 items-start justify-between ">
            <h2 className="text-[#3d3d3d] dark:text-white text-2xl md:text-4xl font-bold">{video.title}</h2>
            {author ? (
              <EditVideo
                videoId={videoId}
                title={video.title as string}
                description={video.description as string}
              />
            ) : (
              <></>
            )}
          </div>
          <span className="text-xs text-md flex gap-x-3 md:mt-2">
            <p className="text-[#3d3d3d] dark:text-[#9D9D9D] capitalize">
              {video.User?.firstName} {video.User?.lastName}
            </p>
            <p className="text-[#3d3d3d] dark:text-[#707070]">
              {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
            </p>
          </span>
        </div>
        {/* <Separator className="text-neutral-500 my-2" /> */}
        <video
          preload="metadata"
          className="w-full aspect-video opacity-50 rounded-xl"
          controls
        >
          <source
            src={video.source}
          />
        </video>
        <div className="flex flex-col text-xl md:text-2xl gap-y-4">
          <div className="flex gap-x-5 items-center justify-between">
            <p className="text-[#3d3d3d] dark:text-[#BDBDBD] text-semibold">Description</p>
            {author ? (
              <EditVideo
                videoId={videoId}
                title={video.title as string}
                description={video.description as string}
              />
            ) : (
              <></>
            )}
          </div>
          <p className="text-[#3d3d3d] dark:text-[#9D9D9D] text-sm md:text-lg text-medium">
            {video.description}
          </p>
        </div>
      </div>
      <div className="lg:col-span-1 flex flex-col gap-y-16">
        <div className="flex justify-end gap-x-3 items-center">
          <CopyLink
            variant="outline"
            classname="rounded-full bg-transparent px-10"
            folderId={videoId}
          />
          <RichLink
            description={truncateString(video.description as string, 150)}
            id={videoId}
            source={video.source}
            title={video.title as string}
          />
          <Download className="text-[#3d3d3d] dark:text-[#4d4c4c]" />
        </div>
        <div>
          <TabMenu
            defaultValue="AI tools"
            triggers={["AI tools", "Transcript", "Activity"]}
          >
            <AITools
              videoId={videoId}
              trial={video.User?.trial}
              plan={video.User?.subscription?.plan}
            />
            <VideoTranscript transcript={video.summery} />
            <Activities  videoId={videoId} />
          </TabMenu>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
