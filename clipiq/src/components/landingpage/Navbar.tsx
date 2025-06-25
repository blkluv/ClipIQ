"use client";
import logo from "../../../public/images/logo.jpeg";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

export default function Navbar() {
  const { user } = useUser();
  const router = useRouter();

  const loginRedirect = () => {
    router.push("/auth/sign-in");
  };

  return (
    <nav
      className="w-full flex items-center justify-between px-4 md:px-8 py-4 bg-black/70 backdrop-blur fixed top-0 left-0 z-50"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-2">
        <Image src={logo} alt="CentralAxis Logo" className="h-8 w-8" />
        <span className="text-2xl font-bold ml-2">ClipIQ</span>
      </div>
      {!user ? (
        <div>
          <Button onClick={loginRedirect} className="bg-neutral-700" variant="ghost">
            SignUp{" "}<LogIn/>
          </Button>
        </div>
      ) : (
        <UserButton />
      )}
    </nav>
  );
}
