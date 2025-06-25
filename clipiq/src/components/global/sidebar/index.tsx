"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { getUserWorkspaces } from "../../../app/actions/workspace";
import { WorkspaceProps } from "@/types/index.type";
import Modal from "@/components/global/modal";
import {Menu, PlusCircle } from "lucide-react";
import Search from "../Search";
import Link from "next/link";
import { menuItems } from "@/constants/menu-items";
import SidebarItems from "./sidebar-items";
import WorkSpaceIcon from "@/components/Icon/WorkSpaceIcon";
import GlobalCard from "@/components/global/globalcard";
import { Button } from "@/components/ui/button";
import InfoBar from "../topbar";

type SidebarProps = {
  activeWorkspaceId: string;
};
const Sidebar = ({ activeWorkspaceId }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleWorkspaceChange = (value: string) => {
    console.log("Selected workspace:", value);
    // Navigate to the selected workspace
    //WIP- rectify - bounces back due to layout.tsx verifyworkspaceaccess(hasaccess)
    router.push(`/dashboard/${value}`);
  };

  const { data, isFetched } = useQueryData(
    ["user-workspaces"],
    getUserWorkspaces
  );

  const menuitems = menuItems(activeWorkspaceId);
  const { data: workspace } = data as WorkspaceProps;

  //left -renaming data to workspace and destructuring
  //eight- typing data as WorkspaceProps to ensure type safety and ignoring status part
  //as getUserWorkspaces returns an object with status and data properties
  //now workspace has 3 properties: subscription, workspace, members

  const SideBarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[280px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/images/logo.jpeg" alt="logo" width={40} height={40} />
        <Link href="/">
          <span className="text-2xl text-white">ClipIQ</span>
        </Link>
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
                  className="bg-neutral-200 text-black  "
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
              workspace?.members?.length > 0 &&
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
      {/* //WIP - currentWorkspace.type==="PUBLIC" && */}
      {workspace?.subscription?.plan === "FREE" ? (
        ""
      ) : (
        <Modal
          trigger={
            <span className="text-lg  cursor-pointer flex justify-center items-center bg-neutral-800/90 hover:bg-neutral-800/60 p-[10px] px-5 w-full rounded-sm gap-2 text-neutral-300">
              <PlusCircle
                size={20}
                className="text-neutral-800/90 fill-neutral-500"
              />
              <span className="text-xs font-semibold">
                Invite to Workspace{" "}
              </span>
            </span>
          }
          title="Invite others"
          description="Invite others to your workspace."
        >
          <Search activeWorkspaceId={activeWorkspaceId} />
        </Modal>
      )}

      <p className="mt-2 w-full text-[#9D9D9D] font-bold">Menu</p>
      <nav className="w-full">
        <ul>
          {menuitems.map((item) => (
            <SidebarItems
              key={item.title}
              icon={item.icon}
              title={item.title}
              href={item.href}
              selected={item.href === pathname}
            />
          ))}
        </ul>
      </nav>

      <Separator className="w-full text-[#777777] m-0" />
      <p className="mt-4 w-full text-[#9D9D9D] font-bold">Workspaces</p>
      {workspace?.subscription?.plan === "FREE" && (
        <p className="text-xs text-[#9D9D9D]">
          You are on a free plan. Upgrade to add public workspaces.
        </p>
      )}
      <nav className="w-full">
        <ul className="h-fit overflow-auto overflow-x-hidden">
          {workspace?.workspace?.length > 0 &&
            workspace?.workspace?.map(
              (workspace) =>
                workspace.type !== "PERSONAL" && (
                  <SidebarItems
                    key={workspace.id}
                    icon={<WorkSpaceIcon name={workspace.name} />}
                    title={workspace.name}
                    href={`/dashboard/${workspace.id}`}
                    selected={activeWorkspaceId === workspace.id}
                  />
                )
            )}
          {workspace?.members?.length > 0 &&
            workspace?.members?.map((workspace) => (
              <SidebarItems
                key={workspace.WorkSpace.id}
                icon={<WorkSpaceIcon name={workspace.WorkSpace.name} />}
                title={workspace.WorkSpace.name}
                href={`/dashboard/${workspace.WorkSpace.id}`}
                selected={activeWorkspaceId === workspace.WorkSpace.id}
              />
            ))}
        </ul>
      </nav>
      <Separator className="w-full text-[#777777] m-0" />
      {workspace.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Upgrade to Pro"
          description=" Unlock AI features like transcription, AI summary, and more."
          footer={
            <Button variant="ghost" className="w-full bg-amber-50 text-black">
              {" "}
              Upgrade
            </Button>
          }
        />
      )}
    </div>
  );

  return (
    <div className="full">
      <InfoBar/>
      <div className="md:hidden h-16"></div>
      <Sheet>
        <SheetTrigger
        asChild
        className="ml-4 z-50"
        >
          <Button variant={"ghost"} 
          className="mt-4 md:hidden relative z-50">
            <Menu/>
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0 w-fit h-full z-50">
          <SheetTitle className="hidden"></SheetTitle>
          {SideBarSection}
        </SheetContent>
      </Sheet>
      <div className="md:block hidden  h-full">
        {SideBarSection}
        </div>
    </div>
  );
};

export default Sidebar;
