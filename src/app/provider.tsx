"use client";
import { SessionProvider } from "next-auth/react";

const Provider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => <SessionProvider>{children}</SessionProvider>;

export default Provider;
