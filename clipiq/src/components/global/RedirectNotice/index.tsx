// RedirectNotice.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectNotice({ title,message, to, delay = 2000 }: {title:string, message: string, to: string, delay?: number }) {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(to);
    }, delay);
    return () => clearTimeout(timer);
  }, [to, delay, router]);
  return (
    <div className="h-screen container flex flex-col gap-y-4 justify-center items-center">
      <h2 className="text-6xl font-bold text-white">{title}</h2>
      <p>{message}</p>
    </div>
  );
}