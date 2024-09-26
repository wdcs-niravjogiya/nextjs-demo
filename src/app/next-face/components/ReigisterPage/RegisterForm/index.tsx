"use client";

import Link from "next/link";
import React, { useState } from "react";
import { registerAction } from "./action";
import { ToastContainer, toast } from "react-toastify";

const RegisterForm = () => {
  const [response, setResponse] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const resData = await registerAction(formData);
      console.log("Register response:", resData);
      setResponse(resData || "Registration successful");
      if (resData.success === true) {
        toast.success(resData.message);
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error("Registration failed");
      console.error("Registration error:", error);
    }
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
      <div className="relative w-full mb-4">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="Username"
        >
          Username*
        </label>
        <input
          type="text"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Username"
          name="username"
          id="Username"
          autoComplete="off"
        />
      </div>
      <div className="">
        {/* <div
          className={`${
            response.success === true ? "text-green-500" : "text-red-500"
          } mt-1 mb-2`}
        >
          {response.message}
        </div> */}

        <button
          className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit"
        >
          Sign Up
        </button>
        <div className="flex justify-between mt-6">
          <div className="">Already have an Account?</div>
          <Link href="/next-face/login" className="text-center">
            Login Now
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
