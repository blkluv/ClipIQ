"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { getUserWorkspaces } from "../../../app/actions/workspace";
import { WorkspaceProps } from "@/types/index.type";

type SidebarProps = {
  activeWorkspaceId: string;
};
const Sidebar = ({ activeWorkspaceId }: SidebarProps) => {
  const router = useRouter();
  const handleWorkspaceChange = (value: string) => {
    console.log("Selected workspace:", value);
    // Navigate to the selected workspace
    router.push(`/dashboard/${value}`);
  };

  const { data, isFetched } = useQueryData(
    ["user-workspaces"],
    getUserWorkspaces
  );

  //left -renaming data to workspace and destructuring
  //eight- typing data as WorkspaceProps to ensure type safety and ignoring status part
  //as getUserWorkspaces returns an object with status and data properties
  const { data: workspace } = data as WorkspaceProps;
  //now workspace has 3 properties: subscription, workspace, members

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/images/logo.jpeg" alt="logo" width={40} height={40} />
        <p className="text-2xl">ClipIQ</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={handleWorkspaceChange}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select Workspace" />
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces owned</SelectLabel>
            <Separator />
            {isFetched &&
              workspace?.workspace?.map((workspace) => (
                <SelectItem
                  key={workspace.id}
                  value={workspace.id}
                  className="className='bg-neutral-200 text-black  hover:bg-[#232136] "
                >
                  {workspace.name}
                </SelectItem>
              ))}
          </SelectGroup>
          <Separator />
          <SelectGroup>
            <SelectLabel>Member in</SelectLabel>
            <Separator />
            {isFetched &&
              workspace.members.length > 0 &&
              workspace?.members?.map((member) => (
                <SelectItem
                  key={member.WorkSpace.id}
                  value={member.WorkSpace.id}
                  className="bg-neutral-200 text-black"
                >
                  {member.WorkSpace.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sidebar;
