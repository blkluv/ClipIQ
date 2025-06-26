"use client";
import { renameFolderAction } from "@/app/actions/workspace";
import Loader from "@/components/global/loader";
import { Input } from "@/components/ui/input";
import useMutataionData, {
  useMutationDataState,
} from "@/hooks/useMutataionData";
import { cn } from "@/lib/utils";
import { FolderArchive } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

type props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ name, id, optimistic, count }: props) => {
  const [onrename, setonRename] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate, isPending } = useMutataionData({
    mutationKey: ["rename-folder"],
    mutationFn: async (data: { name: string }) => {
      return renameFolderAction(data.name, id);
    },
    queryKey: "workspace-folders",
    onSuccess:() => setonRename(false),
  });

  const { latestVariables } = useMutationDataState(["rename-folder"]);

  const handleFolderClick = () => {
    if (onrename) return;
    router.push(`${pathname}/folder/${id}`);
  };
  const handleDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    setonRename(true);
  };

  const updateName = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log("firedddd");
    if (inputRef.current && inputRef.current.value) {
      mutate({ name: inputRef.current.value, id: id });
    }
    setonRename(false);
  };

  return (
    <div
      onClick={handleFolderClick}
      className={cn( optimistic?"'opacity-60'":"",
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg  border-1 border-neutral-700"
      )}
    >
      <Loader state={isPending}>
        <div className="flex flex-col gap-1">
          {onrename ? (
            <Input
              autoFocus
              ref={inputRef}
              placeholder={name}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                updateName(e);
              }}
              className="border-none outline-none  text-base w-full text-neutral-300 bg-transparent p-0"
            />
          ) : (
            <p
            suppressHydrationWarning
              onDoubleClick={handleDoubleClick}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-[#0f0f0f] hover:text-neutral-300 dark:text-neutral-300"
            >
              {latestVariables &&
              latestVariables.status == "pending" &&
              latestVariables.variables.id === id
                ? latestVariables.variables.name
                : name}
            </p>
          )}
          <span className="text-xs text-[#1D1D1D] hover:text-neutral-300 dark:text-neutral-500">
            {count ? `${count} videos` : "0 videos"}{" "}
          </span>
        </div>
      </Loader>
      <FolderArchive className="text-neutral-600 fill-neutral-600" />
    </div>
  );
};

export default Folder;
