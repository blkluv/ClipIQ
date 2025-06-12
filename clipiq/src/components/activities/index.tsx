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


  return (
    <TabsContent
      value="Activity"
      className="rounded-xl flex flex-col bg-[#1D1D1D]  gap-y-5"
    >
      <CommentForm videoId={videoId}/>
      {comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment.comment}
            author={{
              image: comment.User?.image || "",
              firstname: comment.User?.firstname || "",
              lastname: comment.User?.lastname || ""
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
