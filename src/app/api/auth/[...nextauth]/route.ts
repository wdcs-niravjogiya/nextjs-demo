import { signIn } from "next-auth/react";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface MyCredentials {
  email: string;
}
const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      // type: "credentials",
      credentials: {},
      async authorize(credentials: MyCredentials) {
        const { email } = credentials;
        if (!email) {
          return null;
        }
        try {
          const authResponse = await fetch(
            `https://jsonplaceholder.typicode.com/users?email=${email}`,
            {
              // method: "POST",
              // headers: {
              //   "Content-Type": "application/json",
              // },
              // body: JSON.stringify(credentials),
            }
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
          console.log("user-------------------", user[0].email);
          return { email: user[0].email };
        } catch (error) {
          console.error("Error fetching user data:", error);
          return null;
        }
      },
    }),
  ],
  // callbacks: {
  //   async session({ session, user, token }) {
  //     console.log("callbacks session----------------", session.user?.email);
  //     return session;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
});

// const handler = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     // signIn: "/",
//   },
//   providers: [
//     CredentialsProvider({
//       type: "credentials",
//       credentials: {
//         email: {
//           label: "E-Mail",
//           type: "email",
//           placeholder: "Enter your Email",
//         },
//         // password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // Add logic here to look up the user from the credentials supplied
//         const { email }: any = credentials;

//         if (email === "nirav@gmail.com") {
//           // Any object returned will be saved in `email` property of the JWT
//           return {
//             Id: 1,
//             email: email,
//             UserName: "Nirav",
//           };
//         } else {
//           // If you return null then an error will be displayed advising the user to check their details.
//           return null;

//           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         }
//       },
//     }),
//   ],
// });

export { handler as GET, handler as POST };
