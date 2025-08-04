import React from "react";
import Modal from "@/components/global/modal";
import { Button } from "@/components/ui/button";
import { Download, Video } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const Record = () => {
  return (
    <Modal
      trigger={
        <Button className=" bg-[#9d9d9d] text-black hover:bg-neutral-600 flex items-center gap-2">
          <Video className="fill-black" />
          <span className="flex items-center gap-2 font-bold">Record</span>
        </Button>
      }
      title="Clip IQ Desktop App - Screen Recorder"
      description="Download and record your video using the Clip IQ desktop app. The video gets uplaoded in real time automatically to your workspace."
    >
      <div className="flex flex-col items-center justify-center mt-4 gap-4">
        <Link
        onClick={() => { toast.success("Download Started...") }}
          target="_blank" 
          className="flex items-center justify-center gap-2 bg-purple-600 text-white p-2 rounded-md"
          href="https://github.com/utkarsh-2033/ClipIQ-desktop-app/releases/download/v0.0.1/ClipIQ.Recorder.Setup.0.0.0.exe"
        >
          {" "}
          <Download /> Download App
        </Link>
      </div>
    </Modal>
  );
};

export default Record;
