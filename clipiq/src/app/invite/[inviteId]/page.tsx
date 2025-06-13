import { acceptInviteAction } from "@/app/actions/user";
import RedirectNotice from "@/components/global/RedirectNotice";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  params: {
    inviteId: string;
  };
};

const Page = async ({ params: { inviteId } }: Props) => {
  const invite = await acceptInviteAction(inviteId);

  if (invite.status === 404) return redirect("/auth/sign-in");

  if (invite.status === 402) {
    return <RedirectNotice
      title="Already Accepted"
      message="You are already a member of this workspace. Redirecting in few secons..."
      to={"/auth/callback"}
      delay={3000}
    />;
  }

  if (invite?.status === 200) {
    return <RedirectNotice
      title="Joined Workspace successfully"
      message="You have joined the workspace as a member. Redirecting in few secons..."
      to={"/auth/callback"}
      delay={3000}
    />;
    
  }

  // Not authorized fallback
  return (
    <div className="h-screen container flex flex-col gap-y-4 justify-center items-center">
      <h2 className="text-6xl font-bold text-white">Not Authorized</h2>
      <p>You are not authorized to accept this invite</p>
    </div>
  );
};

export default Page;
