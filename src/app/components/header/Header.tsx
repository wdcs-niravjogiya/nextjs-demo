"use client";

import React from "react";
import SessionClient from "../SessionClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = async () => {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/api/auth/signout");
    localStorage.removeItem("userData");
  };

  const session = SessionClient;
  console.log("session------------> ", session);

  return (
    <div>
      <SessionClient />
      <nav>
        <div className="w-full text-center">
          {session ? (
            <button
              className="text-white py-1 px-3 rounded bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            ""
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
