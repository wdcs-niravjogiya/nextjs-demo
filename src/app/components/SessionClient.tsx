"use client";
import { useSession, SessionProvider } from "next-auth/react";

const SessionClient: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col justify-center pt-32">
      <div className="font-semibold text-xl tracking-tight text-white w-full text-center">
        {session && session.user?.email}
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
