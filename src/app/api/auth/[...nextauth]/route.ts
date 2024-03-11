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
          const authResponse = await fetch(
            `https://jsonplaceholder.typicode.com/users?email=${email}`
          );
          console.log("API Response Status:", authResponse.status);

          if (!authResponse.ok) {
            console.error("API Error:", authResponse.statusText);
            return null;
          }

          const user = await authResponse.json();
          if (user.length === 0 && user[0].email === "" && !user[0].email) {
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
