"use client";
import { useQueryData } from "@/hooks/useQueryData";
import React from "react";
import { FolderProps } from "@/types/index.type";
import { getFolderInfo } from "@/app/actions/workspace";
import { SortAsc } from "lucide-react";

type Props = {
  folderId: string;
};

const FolderInfo = ({ folderId }: Props) => {
  const { data } = useQueryData(["folder"], () => getFolderInfo(folderId));
  const { data: folder } = data as FolderProps;
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[#8d8d8d] font-semibold text-2xl">{folder.name}</h2>
      
    </div>
  );
};

export default FolderInfo;
