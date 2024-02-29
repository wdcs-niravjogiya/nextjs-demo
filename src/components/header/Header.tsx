import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import SessionClient from "../../app/components/SessionClient";

const Header = async () => {
  return (
    <div>
      <SessionClient />
      {/* <nav>
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
      </nav> */}
    </div>
  );
};

export default Header;
