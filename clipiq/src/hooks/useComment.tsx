import { addCommentAndReply } from "@/app/actions/user";
import useMutataionData from "./useMutataionData";
import useZodForm from "./useZodForm";
import { Schema } from "zod";
import { commentSchema } from "@/components/forms/Comment/schema";

type props = {
  videoId: string;
  userId: string;
  parentCommentId?: string;
//   schema :Schema
};
export const useComment = ({ videoId, userId, parentCommentId }: props) => {
  const {mutate , isPending} = useMutataionData({
    mutationKey: ["add-comment"],
    mutationFn: (data:{comment:string}) => addCommentAndReply(videoId,data.comment,userId,parentCommentId),
    queryKey:"video-comments",
    onSuccess:() => reset()
  });
  const {register,watch,errors,handleSubmit,reset}=useZodForm(
    commentSchema,
    mutate
  )

  return {
    isPending,
    register,
    errors,
    handleSubmit
  }
};
