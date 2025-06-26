"use client";
import { usePathname } from "next/navigation";
import GlobalHeader from "../global-header";
import { WorkSpace } from "../../../generated/prisma/index";
type Props = {
  workspace: WorkSpace;
  children: React.ReactNode;
};
export default function ClientWrapper({ workspace, children }: Props) {
  const pathname = usePathname();
  const path = pathname?.split(`/dashboard/${workspace.id}`)[1] ?? "";
  const hideHeader = path?.includes("video");

  return (
    <div className={`w-full ${hideHeader ? "pt-0" : "pt-28"} p-6 overflow-y-scroll overflow-x-hidden`}>
      {!hideHeader && <GlobalHeader workspace={workspace} />}
      <div className="mt-4">{children}</div>
    </div>
  );
}
