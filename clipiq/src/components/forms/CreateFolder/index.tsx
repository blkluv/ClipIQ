"use client";
import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FolderSchema } from "./schema";
import useZodForm from "@/hooks/useZodForm";
import useMutataionData from "@/hooks/useMutataionData";
import { CreateFolderAction } from "@/app/actions/workspace";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type props={
    WorkSpaceId:string
}

const CreateFolderForm = ({WorkSpaceId}:props) => {
  const { mutate, isPending } = useMutataionData({
    mutationKey: ["create-folder"],
    mutationFn: (data: { name: string }) => CreateFolderAction(WorkSpaceId,data.name),
    queryKey: "workspace-folders",
  });

  const { register, handleSubmit, errors } = useZodForm(
    FolderSchema,
    mutate
  );
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
      <Label className="flex flex-col gap-2 text-[#9D9D9D]" htmlFor={"name"}>
        <Input
          id={"name"}
          type="text"
          placeholder="Enter your folder name"
          className="bg-transparent border-themeGray text-themeTextGray"
          {...register("name")}
        />
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => (
            <p className="text-red-400 mt-2">
              {message === "Required" ? "" : message}
            </p>
          )}
        />
      </Label>
      <Button
        className="text-sm w-full mt-2"
        type="submit"
        disabled={isPending}
      >
        <Loader state={isPending}>Create Folder</Loader>
      </Button>
    </form>
  );
};

export default CreateFolderForm;
