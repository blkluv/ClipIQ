// import VideoRecorderIcon from '@/components/icons/video-recorder'
import VideoUpload from "@/components/forms/video-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { Search, Video } from "lucide-react";
import Record from "./record";
type Props = {
  userId: string | null;
};
const InfoBar = ({ userId }: Props) => {
  return (
    <header className="pl-20 md:pl-[300px] w-full fixed z-10 p-4  flex items-center justify-between gap-4 ">
      <div className=" hidden md:flex gap-4 justify-center items-center border-2 border-neutral-800 p-1 rounded-full px-4 w-full max-w-lg">
        <Search size={25} className="text-[#707070]" />
        <Input
          className="bg-transparent border-none outline-none !placeholder-neutral-500"
          placeholder="Search for people, projects, tags & folders"
        />
      </div>
      <div className="flex items-center gap-4">
        <VideoUpload userId={userId} />
        <Record/>
        <UserButton />
      </div>
    </header>
  );
};

export default InfoBar;
