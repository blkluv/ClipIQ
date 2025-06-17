// import FormGenerator from '@/components/global/form-generator'
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditVideo } from "@/hooks/useEditVideo";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";

type Props = {
  videoId: string;
  title: string;
  description: string;
};

const EditVideoForm = ({ description, title, videoId }: Props) => {
  const { errors, isPending, handleSubmit, register } = useEditVideo(
    videoId,
    title,
    description
  );
  const submithandler=()=>{
    console.log(".....reached....")
    handleSubmit
  }

  return (
    <form onSubmit={submithandler} className="flex flex-col gap-y-5">
      
      <Label
        className="flex flex-col gap-2 text-[#9D9D9D]"
        htmlFor="Title"
      >
        <Input
          id="Title"
          type="text"
          placeholder='Video Title...'
          className="bg-transparent border-themGray text-themeTextGray"
          {...register("title")}
        />
        <ErrorMessage
          errors={errors}
          name={title}
          render={({ message }) => (
            <p className="text-red-400 mt-2">
              {message === "Required" ? "" : message}
            </p>
          )}
        />
      </Label>
     
      <Label htmlFor="Description" className="flex flex-col gap-2">
        <Textarea
          className="bg-transparent border-themeGray text-themeTextGray"
          id="Description"
          placeholder='Video Description...'
          rows={5}
          {...register("description")}
        />
        <ErrorMessage
          errors={errors}
          name={description}
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
        disabled={isPending}>
        <Loader state={isPending}>Update</Loader>
      </Button>
    </form>
  );
};

export default EditVideoForm;
