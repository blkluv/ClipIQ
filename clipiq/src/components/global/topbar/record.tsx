import React from "react";
import Modal from "@/components/global/modal";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

const Record = () => {
  return (
    <Modal
      trigger={
        <Button className=" bg-[#9d9d9d] text-black hover:bg-neutral-600 flex items-center gap-2">
          <Video className="fill-black" />
          <span className="flex items-center gap-2 font-bold">Record</span>
        </Button>
      }
      title="Clip IQ Desktop App - Record"
      description="Record your video using the Clip IQ desktop app"
    >
      <p>
        Due to auth platform (Clerk/OAuth) security restrictions, true OAuth
        login cannot work in a packaged Electron build without a custom domain
        and production credentials which required custom domain and does not
        accept vercel domains.
      </p>
      <p className="mt-4 text-blue-300 hover:underline">
        <a href="https://github.com/utkarsh-2033/ClipIQ-desktop-app">
          GitHub Link
        </a>
      </p>
    </Modal>
  );
};

export default Record;
