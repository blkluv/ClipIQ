"use client";
import { WorkSpace } from "../../../generated/prisma/index";
import { usePathname } from "next/navigation";

type Props = {
  workspace: WorkSpace;
};

const GlobalHeader = ({ workspace }: Props) => {
  const pathName = usePathname().split(`/dashboard/${workspace.id}`)[1];

  if (pathName.includes("video")) return null;
  return (
    <article className="flex flex-col gap-2">
      <span className="text-[#3d3d3d] dark:text-[#707070] text-xs">
        {!pathName.includes("settings") &&
          !pathName.includes("billing") &&
          !pathName.includes("notification") &&
          !pathName.includes("home") &&
          workspace.type.toLocaleUpperCase()}
      </span>
      <h1 className="text-4xl text-[#3d3d3d] dark:text-neutral-200">
        {pathName && !pathName.includes("folder") && !pathName.includes("video")
          ? pathName.charAt(1).toUpperCase() + pathName.slice(2).toLowerCase()
          : "My Library"}
      </h1>
    </article>
  );
};

export default GlobalHeader;
