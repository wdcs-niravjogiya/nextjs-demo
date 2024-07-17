import { ReactNode } from "react";
import { API_LIST } from "@/util/constant";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { email } = credentials;
        if (!email) {
          return null;
        }
        try {
          const authResponse = await fetch(`${API_LIST.USER_DETAIL}${email}`);
          console.log("API Response Status:", authResponse.status);

          if (!authResponse.ok) {
            console.error("API Error:", authResponse.statusText);
            return null;
          }

          const user = await authResponse.json();
          if (user.length === 0 && user.email === "" && !user.email) {
            return null;
          }
          console.log("user-------------------", user);
          return { email: user[0].email };
        } catch (error) {
          console.error("Error fetching user data:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
