"use client";
import { getUserNotifications } from "@/app/actions/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQueryData } from "@/hooks/useQueryData";
import { Bell, User } from "lucide-react";
import React from "react";

const Notifications = () => {
  // we already prefetched the data in the layout.tsx
  const { data, isFetching } = useQueryData(
    ["user-notifications"],
    getUserNotifications
  );

  const { data: notification, status } = data as {
    status: number;
    data: {
      notification: {
        id: string;
        userId: string | null;
        content: string;
        createdAt: Date;
      }[];
    };
  };
  const daysAgo = (date: Date) => {
    return Math.floor(
      (new Date().getTime() - date.getTime()) / (24 * 60 * 60 * 1000)
    );
  };

  if (isFetching) {
    return <p>Loading…</p>;
  }
  if (status !== 200) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p>No Notification</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-3 bg-neutral-800 rounded-sm p-5">
      {notification.notification.map((n) => (
        <div
          key={n.id}
          className="border-2 flex gap-x-3 text-neutral-400 items-center rounded-lg p-3"
        >
          <Avatar>
            <AvatarFallback>
              <Bell />
            </AvatarFallback>
          </Avatar>
          <p>{n.content}</p>
          <span className="text-neutral-500 absolute right-0">
            {n.createdAt && daysAgo(n.createdAt)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
