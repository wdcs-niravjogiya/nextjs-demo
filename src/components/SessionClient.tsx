"use client";
import { useSession, getSession, SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SessionClient: React.FC = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    console.log("session?.user?.email--------------", session?.user?.email);
    console.log("session--------------", session);
  } else {
    console.log("-----------------No session--------------");
  }
  const router = useRouter();

  const handleLogout = () => {
    router.push("/api/auth/signout");
    localStorage.removeItem("userData");
  };

  // const [sessionValue, setSessionValue] = useState<any>({});

  // useEffect(() => {
  //   const getSessionInfo = async () => {
  //     const session = await getSession(); // You can customize GetSessionOptions if needed
  //     setSessionValue(session ?? "");
  //   };
  //   getSessionInfo();
  //   console.log("sessionValue", sessionValue);
  // }, []);

  return (
    <div className="flex flex-col justify-center pt-32">
      <div className="font-semibold text-xl tracking-tight text-white w-full text-center">
        {session && session.user?.email}
      </div>
      <div className="w-full text-center">
        <br />
        {session && (
          <button
            className="text-white py-1 px-3 rounded bg-red-600"
            onClick={handleLogout}
          >
            {" "}
            Logout
          </button>
        )}
        <br></br>
        {/* {session &&  */}
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
