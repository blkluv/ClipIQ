import Modal from "@/components/global/modal";
import { Move } from "lucide-react";
import React from "react";
import MoveVideo from "./move-video";

type props = {
  videoId: string;
  currentWorkspace: string;
  currentFolder?: string;
  folderName?: string;
};
const CardMenu = ({
  videoId,
  currentWorkspace,
  currentFolder,
  folderName,
}: props) => {
  return (
    <Modal
      className="flex items-center cursor-pointer gap-x-2"
      title="Move to new Workspace/Folder"
      description="This Action is permananet and canot be undo."
      trigger={<Move size={20} fill="#a4a4a4" className="text-[#a4a4a4] p-1 rounded-full hover:bg-purple-700" />}
    >
      <MoveVideo
        videoId={videoId}
        currentWorkspace={currentWorkspace}
        currentFolder={currentFolder}
        folderName={folderName}
      />
    </Modal>
  );
};

export default CardMenu;
