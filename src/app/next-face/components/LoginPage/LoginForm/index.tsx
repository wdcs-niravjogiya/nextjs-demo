"use client";
import { TOAST } from "@/app/constants/commanConstants";
import Notification from "@/app/services/notificaation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const data = { email, password };

    const res = await fetch("https://api.freeapi.app/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();
    if (resData.success === true) {
      Notification({ type: TOAST.SUCCESS, message: resData.message });
      // toast.success(resData.message);
      router.push("/next-face/play-list");
    } else {
      Notification({ type: TOAST.ERROR, message: resData.message });
    }
    console.log("resData-------", resData);
    localStorage.setItem("user", JSON.stringify(resData));
  };
  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
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
