"use client";
import { cn } from "@/lib/utils";
import { ArrowRight, FolderArchive } from "lucide-react";
import React from "react";
import Folder from "./folder";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorkspaceFolders } from "@/app/actions/workspace";
import {  FoldersProps } from "@/types/index.type";
import { useMutationDataState } from "@/hooks/useMutataionData";
type props = {
  workspaceId: string;
};
const Folders = ({ workspaceId }: props) => {
  const { data, isFetched } = useQueryData(["workspace-folders"], async () =>
    getWorkspaceFolders(workspaceId)
  );

  const { latestVariables } = useMutationDataState(["create-folder"]);

  // const { data: folders } = data as FoldersProps;
  const foldersData = (data as FoldersProps) || { status: 0, data: [] };
const { status, data: folders } = foldersData;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderArchive className="text-neutral-600 fill-neutral-600" />
          <h2 className="text-xl text-[#bdbdbd] font-semibold">Folders</h2>
        </div>
        <div className="flex items-center gap-4">
          <h5 className="text-md text-[#bdbdbd] font-semibold">See All</h5>
          <ArrowRight className="text-neutral-500" />
        </div>
      </div>
      <section
        className={cn(
          status !== 200 && "justify-center",
          "flex items-center gap-4 overflow-x-auto w-full",
          "scrollbar-hidden"
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300">No Folders In Workspace</p>
        ) : (
          <>
            {latestVariables && latestVariables.status === "pending" && (
              <Folder
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
                optimistic
              />
            )}
            {folders.map((folder) => (
              <Folder
                key={folder.id}
                name={folder.name}
                id={folder.id}
                count={folder._count.videos}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;
