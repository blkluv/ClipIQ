"use client";
import useZodForm from "./useZodForm";
import { editVideoInfoSchema } from "@/components/forms/edit-video/schema";
import useMutataionData from "./useMutataionData";
import { editVideoInfo } from "@/app/actions/workspace";

export const useEditVideo = (
  videoId: string,
  title: string,
  description: string
) => {
  const { mutate, isPending } = useMutataionData({
    mutationKey: ["edit-video"],
    mutationFn: (data: { title: string; description: string }) =>
      editVideoInfo(videoId, data.title, data.description),
    queryKey: "video-data",
  });

  const { errors, handleSubmit, register } = useZodForm(
    editVideoInfoSchema,
    mutate,
    {
      title,
      description,
    }
  );

  return {
    handleSubmit,
    register,
    errors,
    isPending,
  };
};
