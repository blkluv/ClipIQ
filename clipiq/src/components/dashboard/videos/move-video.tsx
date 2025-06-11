'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-select";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useMoveVideos } from "@/hooks/useFolders";


type Props = {
  videoId: string;
  currentWorkspace: string;
  currentFolder?: string;
  folderName?: string;
};

const MoveVideo = ({
  videoId,
  currentWorkspace,
  currentFolder,
  folderName,
}: Props) => {
  const {
    register,
    handleSubmit,
    errors,
    workspaces,
    isWorkspacesLoading,
    folders,
    isFetching,
    isPending,
  } = useMoveVideos(videoId, currentWorkspace);

  // current selections
  const currentWs = workspaces.workspace.find((w) => w.id === currentWorkspace);
  const currentFld = folders.find((f) => f.id === currentFolder);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
      <div className="border rounded-xl p-5">
        <h2 className="text-xs text-[#a4a4a4]">Current Workspace</h2>
        {currentWs ? <p>{currentWs.name}</p> : <p>Loading…</p>}
        <h2 className="text-xs text-[#a4a4a4] mt-4">Current Folder</h2>
        {currentFld ? <p>{currentFld.name}</p> : <p>Loading…</p>}
      </div>

      <Separator />

      <div className="flex flex-col gap-y-5 p-5 border rounded-xl">
        <h2 className="text-xs text-[#a4a4a4]">Move To</h2>

        {/* Workspace Select */}
        <Label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
          {isWorkspacesLoading ? (
            <Skeleton className="h-10 w-full rounded-md" />
          ) : (
            <select {...register("workspace_id")}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              
                {workspaces.workspace.map((ws) => (
                  <option className="text-foreground bg-neutral-950" key={ws.id} value={ws.id}>
                    {ws.name}
                  </option>
                ))}
           
            </select>
          )}
          {/* {errors.workspace_id && (
            <p className="text-red-500">{}</p>
          )} */}
        </Label>

        {/* Folder Select */}
        <Label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
          <p>slect folder</p>
          {isFetching ? (
            <Skeleton className="h-10 w-full rounded-md" />
          ) : folders.length > 0 ? (
            <select {...register("folder_id")}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                {folders.map((f) => (
                  <option className="text-foreground" key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
            </select>
          ) : (
            <p className="text-muted-foreground text-sm">
              This workspace has no folders
            </p>
          )}
          {/* {errors.folder_id && (
            <p className="text-red-500">{errors.folder_id.message}</p>
          )} */}
        </Label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Moving…" : "Move Video"}
      </button>
    </form>
  );
};

export default MoveVideo;
