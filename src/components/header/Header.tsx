import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const session = await getServerSession();
  return (
    <div>
      <nav>
        {session && (
          <Link className="text-white" href="/api/auth/signout">
            LogOut
          </Link>
        )}
        {!session && (
          <Link className="text-white" href="/api/auth/signin">
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
