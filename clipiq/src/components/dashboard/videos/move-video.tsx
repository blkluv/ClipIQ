import {
  getUserWorkspaces,
  getWorkspaceFolders,
} from "@/app/actions/workspace";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useQueryData } from "@/hooks/useQueryData";
import { FoldersProps, WorkspaceProps } from "@/types/index.type";
import { Separator } from "@radix-ui/react-select";
import React, { useState } from "react";
import Folder from "../Folders/folder";
type props = {
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
}: props) => {
  //     const [isfolder,setFolders]=useState<|
  //     ({
  //         _count: {
  //           videos: number
  //         }
  //       } & {
  //         id: string
  //         name: string
  //         createdAt: Date
  //         workSpaceId: string | null
  //       })[]
  //     | undefined
  //   >(undefined)>

  const [workspaceSelected, setWorkspaceSelected] = useState<
    string | undefined
  >(undefined);

  //getting workspaces
  const { data } = useQueryData(["user-workspaces"], () => getUserWorkspaces());
  const { data: workspaceData } = data as WorkspaceProps;
  //getting folders
  const { data: workspaceFoldersData } = useQueryData(
    ["workspace-folders"],
    () => getWorkspaceFolders(currentWorkspace)
  );
  const { data: FolderData } = workspaceFoldersData as FoldersProps;

  const folder = FolderData.find((f) => f.id === currentFolder);
  const workspace = workspaceData.workspace.find(
    (w) => w.id === currentWorkspace
  );

  return (
    <form className="flex flex-col gap-y-5">
      <div className="border rounded-xl p-5">
        <h2 className="text-xs  text-[#a4a4a4]">Current Workspace</h2>
        {workspace && <p> {workspace.name}</p>}
        <h2 className="text-xs  text-[#a4a4a4] mt-4">Current Workspace</h2>
        {folder && <p>{folder.name}</p>}
      </div>
      <Separator />
      <div className="flex flex-col gap-y-5 p-5 border rounded-xl">
        <h2 className="text-xs text-[#a4a4a4]">To </h2>
        <Label className="flex-col gap-y-2 flex">
          {/* <p className="text-xs">Select Workspace</p> */}
          <Select
            onValueChange={(value) => {
              setWorkspaceSelected(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="select workspace" />
            </SelectTrigger>
            <SelectContent>
              {workspaceData.workspace &&
                workspaceData.workspace.map((space) => (
                  <SelectItem key={space.id} value={space.id}>
                    {space.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </Label>
        <Label className="flex-col gap-y-2 flex">
          {workspaceSelected && (
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select folders" />
              </SelectTrigger>
              <SelectContent>
                {FolderData &&
                  FolderData.map(
                    (data) =>
                      data.workspaceId === workspaceSelected && (
                        <SelectItem key={data.id} value={data.id}>{data.name}</SelectItem>
                      )
                  )}
              </SelectContent>
            </Select>
          )}
        </Label>
      </div>
    </form>
  );
};

export default MoveVideo;
