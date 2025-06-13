import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/hooks/useSearch";
import React from "react";
import Loader from "../loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, User } from "lucide-react";
import useMutataionData from "@/hooks/useMutataionData";
import { inviteMemberAction } from "@/app/actions/user";

type Props = {
  activeWorkspaceId: string;
};
const Search = ({ activeWorkspaceId }: Props) => {
  const { query, onSearchChange, isFetching, users } = useSearch(
    "search-users",
    "users"
  );

  const { mutate, isPending } = useMutataionData({
    mutationKey: ["invite-memeber"],
    mutationFn: (data: { receiverId: string; emailRecevier: string }) =>
      inviteMemberAction(
        activeWorkspaceId,
        data.receiverId,
        data.emailRecevier
      ),
      queryKey:"user-notifications"
  });

  return (
    <div className="flex flex-col gap-y-5">
      <Input
        type="text"
        placeholder="Search..."
        onChange={onSearchChange}
        value={query}
        className=" bg-transparent text-white outline-none border  border-gray-600 focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50"
      />
      {isFetching ? (
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-8 rounded-xl" />
        </div>
      ) : users.length === 0 ? (
        <p className="text-center text-sm text-[#a4a4a4]">No Users Found</p>
      ) : (
        <div>
          {users.map((user) => (
            <div
              key={user.id}
              className="flex gap-x-3 items-center border-2 w-full p-3 rounded-xl"
            >
              <Avatar>
                <AvatarImage src={user.image as string} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <h3 className="text-bold text-lg capitalize">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="lowercase text-xs bg-white px-2 rounded-lg text-[#1e1e1e]">
                  {user.subscription?.plan.type}
                </p>
              </div>
              <div className="flex-1 flex justify-end items-center">
                <Button
                  onClick={() => {
                    mutate({ receiverId: user.id, emailRecevier: user.email });
                  }}
                  variant={"default"}
                  className="w-5/12 font-bold"
                >
                  <Loader state={isPending} color={"#000"}> 
                    <Mail/>
                  </Loader>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
