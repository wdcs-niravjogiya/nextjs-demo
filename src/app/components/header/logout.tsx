"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  return (
    <div
      className="text-white"
      onClick={() => {
        signOut();
        router.push("/api/auth/signin");
      }}
    >
      Logout
    </div>
  );
}
