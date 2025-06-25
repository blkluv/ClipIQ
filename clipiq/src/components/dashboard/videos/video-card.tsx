import Loader from "@/components/global/loader";
import { VideoProps } from "@/types/index.type";
import React from "react";
import CardMenu from "./menu";
import CopyLink from "./copy-link";
import Link from "next/link";
import { Dot, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type props = {
  video: VideoProps;
};

const VideoCard = ({ video }: props) => {
  console.log(video.User)
  const daysAgo = Math.floor(
    (new Date().getTime() - video.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );
  return (
    <Loader
      className="bg-[#171717] flex justify-center items-center border-[1px] border-[rgb(37,37,37)] rounded-xl"
      state={video.processing}
    >
      <div className="group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-50 gap-x-3 hidden group-hover:flex">
          <CardMenu
            videoId={video.id}
            currentWorkspace={video.workspaceId}
            currentFolder={video.Folder?.id}
            folderName={video.Folder?.name}
          />
          <CopyLink folderId={video?.Folder?.id ?? ""} />
        </div>
        <Link
          href={`/dashboard/${video.workspaceId}/video/${video.id}`}
          className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
        >
          <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-20"
          >
            <source
              src={video.source ? video.source : undefined}
            />
          </video>
        </Link>
      <div className="px-5 py-3 flex flex-col gap-7-2 z-20">
        <h2 className="text-sm font-semibold text-[#BDBDBD]">{video.title}</h2>
        <div className="flex gap-x-2 items-center mt-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={video.User?.image as string} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="capitalize text-xs text-[#BDBDBD]">
              {video.User?.firstName} {video.User?.lastName}
            </p>
            <p className="text-[#6d6b6b]  text-xs flex items-center ">
              <Dot /> {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
            </p>
          </div>
        </div>
      </div>
      </div>
    </Loader>
  );
};

export default VideoCard;
