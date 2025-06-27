"use client";
import Modal from "@/components/global/modal";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
type Props = {
  userId: string | null;
};
const VideoUpload = ({ userId }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Select a file first");

    setUploading(true);
    const form = new FormData();
    form.append("video", file);
    form.append("userId", userId as string);
    const path = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
    try {
      const res = await fetch(`${path}/upload`, {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        const text = await res.text();
        toast.error("Upload failed: " + text);
      } else {
        const json = await res.json();
        toast.success("Upload started!");
        // maybe json.url or whatever
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      trigger={
        <Button className=" bg-[#9d9d9d] text-black hover:bg-neutral-600 flex items-center gap-2">
          <UploadIcon size={20} className="fill-black" />{" "}
          <span className="flex items-center gap-2 font-bold">Upload</span>
        </Button>
      }
      title="Upload Video"
      description="Select a video file to upload."
    >
      <div className="flex flex-col gap-2">
        <Input
          type="file"
          accept="video/*"
          onChange={handleChange}
          className="text-neutral-200"
        />
        <Button
          onClick={handleUpload}
          disabled={uploading || !file}
          className="px-4 py-2 bg-purple-600 disabled:opacity-50 text-white rounded"
        >
          {uploading ? "Uploading…" : "Upload Video"}
        </Button>
      </div>
    </Modal>
  );
};

export default VideoUpload;
