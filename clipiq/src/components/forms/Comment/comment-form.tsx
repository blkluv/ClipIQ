"use client";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useComment } from "@/hooks/useComment";
import { ErrorMessage } from "@hookform/error-message";
import { Send } from "lucide-react";
import React from "react";
import { useQueryData } from "../../../hooks/useQueryData";
import { getUserProfile } from "@/app/actions/user";
import { UserProfileProps } from "@/types/index.type";
type props = {
  parentCommentId?: string;
  isReply?:boolean
  videoId: string;
  close?: () => void
};
const CommentForm = ({ parentCommentId, videoId ,isReply }: props) => {
  const { data: user } = useQueryData(["user-profile"], () => getUserProfile());
  const { data: userdata } = user as UserProfileProps;
  const { isPending, register, handleSubmit, errors } = useComment({
    videoId: videoId,
    userId: userdata.id,
    parentCommentId: parentCommentId,
    // schema: commentSchema,
  });
  return (
    <form className="relative w-full"
    onSubmit={handleSubmit}>
      <Label className="flex flex-col gap-2 text-[#9D9D9D]" htmlFor="comment">
        <Input
          id="comment"
          type="text"
          placeholder={`${isReply?"reply":"comment"} to ${userdata.firstName}`}
          className="bg-transparent border border-neutral-600 text-themeTextGray"
          {...register("comment")}
        />
        <ErrorMessage
            errors={errors}
            name={"comment"}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === 'Required' ? '' : message}
              </p>
            )}
          />
      </Label>
      <Button
        className="p-0 bg-transparent absolute top-[1px] right-3 hover:bg-transparent "
        type="submit"
      >
        <Loader state={isPending}>
          <Send
            className="text-white/50 cursor-pointer hover:text-white/80"
            size={18}
          />
        </Loader>
      </Button>
    </form>
  );
};

export default CommentForm;
