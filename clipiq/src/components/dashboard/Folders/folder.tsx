"use client";
import Loader from "@/components/global/loader";
import { cn } from "@/lib/utils";
import { FolderArchive } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { use } from "react";

type props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ name, id, optimistic, count }: props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleFolderClick=()=>{

  }
  
  return (
    <div
    onClick={handleFolderClick}
      className={cn(
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg broder border-1 border-neutral-700"
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-1">
          <p className="text-neutral-300">{name}</p>
          <span className="text-xs text-neutral-500">
            {count ? `${count} videos` : "0 videos"}{" "}
          </span>
        </div>
      </Loader>
      <FolderArchive className="text-neutral-600 fill-neutral-600" />
    </div>
  );
};

export default Folder;
