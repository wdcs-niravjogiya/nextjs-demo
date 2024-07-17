import Link from "next/link";
import React, { FormEvent } from "react";

interface IFormInput {
  // currentTarget: HTMLFormElement | undefined;
  email: string;
}
async function loginAction(formData: FormData) {
  "use server";
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  const data = { email, password, username };

  const res = await fetch("https://api.freeapi.app/api/v1/users/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();
  console.log("resData-------", resData);
}

const LoginForm = () => {
  return (
    <form action={loginAction}>
      <div className="relative w-full mb-4">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="EmailAddress"
        >
          Email*
        </label>
        <input
          type="email"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Email"
          name="email"
          id="EmailAddress"
          autoComplete="off"
        />
      </div>
      <div className="relative w-full mb-4">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="Password"
        >
          Password*
        </label>
        <input
          type="password"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Password"
          name="password"
          id="Password"
          autoComplete="off"
        />
      </div>

      <div className="">
        {/* <div className="text-red-500 mt-1 mb-2">{error}</div> */}

        <button
          className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit"
        >
          Sign In
        </button>
        <div className="flex justify-between mt-6">
          <div className="">Don’t have an Account</div>
          <Link href="/next-face/register" className="text-center">
            Register Now
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

// export default async function PlayListPage() {
//   async function loginAction(formData: FormData) {
//     "use server";
//     const email = formData.get("email");
//     const password = formData.get("password");
//     const username = formData.get("username");
//     const data = { email, password, username };
//     console.log(data);
//     const res = await fetch("https://api.freeapi.app/api/v1/users/register", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const aa = await res.json();
//     console.log(aa);

//     // await fetch();
//   }

//   return (
//     <form action={loginAction}>
//       <input type="text" name="email" placeholder="email" />
//       <input type="text" name="password" placeholder="password" />
//       <input type="text" name="username" placeholder="username" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
