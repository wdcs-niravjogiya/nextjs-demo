"use client";
import { useSession, getSession, SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SessionClient: React.FC = () => {
  const { data: session } = useSession();
  console.log("session--------------", session?.user?.email);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/api/auth/signout");
    localStorage.removeItem("userData");
  };

  // const [sessionValue, setSessionValue] = useState<any>({});

  // useEffect(() => {
  //   const getSessionInfo = async () => {
  //     const session = await getSession({}); // You can customize GetSessionOptions if needed
  //     setSessionValue(session ?? "");
  //   };
  //   getSessionInfo();
  // }, []);

  return (
    <div className="flex flex-col justify-center pt-32">
      <div className="font-semibold text-xl tracking-tight text-white w-full text-center">
        User: {session ? session.user?.email : "No User"}
        <br />
      </div>
      <div className="font-semibold text-xl tracking-tight text-white w-full text-center">
        {session?.user?.email && (
          <button onClick={handleLogout}> Logout</button>
        )}
      </div>
    </div>
  );
};

const SessionClientWrapper: React.FC = () => {
  return (
    <SessionProvider>
      <SessionClient />
    </SessionProvider>
  );
};

export default SessionClientWrapper;
