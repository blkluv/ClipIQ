import React from "react";
import { TabsContent } from "../ui/tabs";
import CommentForm from "../forms/Comment/comment-form";
import CommentCard from "../global/comment-card";
import { useQueryData } from "@/hooks/useQueryData";
import { getVideoComments } from "@/app/actions/workspace";
import { VideoCommentProps } from "@/types/index.type";

type props = {
  // author: boolean
  videoId: string;
};
const Activities = ({ videoId }: props) => {
  const {data}=useQueryData(["video-comments"],
    ()=>getVideoComments(videoId)
  )

  const {data:comments} =data as VideoCommentProps;
  console.log(comments)


  return (
    <TabsContent
      value="Activity"
      className="rounded-xl flex flex-col p-4 bg-[#1D1D1D]  gap-y-2  " //max-h-100 scrollbar-hidden overflow-y-auto
    >
      <CommentForm videoId={videoId}/>
      {comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment.comment}
            author={{
              image: comment.User?.image || "",
              firstname: comment.User?.firstName || "",
              lastname: comment.User?.lastName || ""
            }}
            videoId={comment.videoId || ""}
            commentId={comment.id}
            reply={comment.reply}
            createdAt={comment.createdAt}
          />
        ))}
    </TabsContent>
  );
};

export default Activities;
