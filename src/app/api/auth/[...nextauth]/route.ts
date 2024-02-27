import { signIn } from "next-auth/react";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      //   type: "credentials",
      credentials: {},
      async authorize(credential) {
        const authResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users?email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credential),
          }
        );

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();
        console.log("user-------------------", user);

        return user;
      },
    }),
  ],
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
