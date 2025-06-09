import { cn } from "@/lib/utils";
import { ArrowRight, FolderArchive } from "lucide-react";
import React from "react";
import Folder from "./folder";
type props={
    workspaceId: string;
}
const Folders = ({workspaceId}:props) => {
    // console.log("Workspace ID:", workspaceId);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderArchive className="text-neutral-600 fill-neutral-600" />
          <h2 className="text-xl text-[#bdbdbd] font-semibold">Folders</h2>
        </div>
        <div className="flex items-center gap-4">
          <h5 className="text-md text-[#bdbdbd] font-semibold">
            See All Videos
          </h5>
          <ArrowRight className="text-neutral-500"/>
        </div>
      </div>
      <section className={cn('flex items-center gap-4 overflow-x-auto w-full',"scrollbar-hidden")}>
        <Folder name="title" id="1"/>
        <Folder name="title" id="1"/>
        <Folder name="title" id="1"/>
        <Folder name="title" id="1"/>
        <Folder name="title" id="1"/>
        <Folder name="title" id="1"/>
      </section>
    </div>
  );
};

export default Folders;
