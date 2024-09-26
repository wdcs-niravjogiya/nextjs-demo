"use client";

import { API_LIST } from "@/util/constant";
import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IFormInput {
  // currentTarget: HTMLFormElement | undefined;
  email: string;
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [user, setUser] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  // const session = SessionClient("");
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const response = axios.get(`${API_LIST.USER_DETAIL}${userInput}`);
      setUser((await response).data);
      const userResponse = JSON.stringify((await response).data);
      console.log("Login Page", userResponse);
      localStorage.setItem("userData", userResponse);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Email not found"); // Set error message
    }
  };

  const handleOnChange = (e: any) => {
    const value = e.target.value;
    console.log("value", value);

    setUserInput(value);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    fetchUserData();
    try {
      const email = data.email;
      const res = await signIn("credentials", {
        email,
        redirect: false,
        callbackUrl: "/dashboard",
      });
      console.log("Signing in", res);
      if (res?.error) {
        setError("Email does not exist");
      } else {
        if (userInput.trim() !== "") {
          await router.push("/dashboard");
          await router.refresh();
        } else {
          setError("Email is required");
          await router.push("/");
        }
      }
    } catch (err) {
      console.log("catch Signing in", err);
    }
  };

  useEffect(() => {
    // if (session !== "") {
    //   router.push("/dashboard");
    // }
  }, []);

  if (!user) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative w-full">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="EmailAddress"
        >
          Email*
        </label>
        <input
          {...register("email", { required: true, maxLength: 50 })}
          type="email"
          onChange={handleOnChange}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Email"
          // name="email"
          id="EmailAddress"
          autoComplete="off"
        />
      </div>
      <div className="">
        <div className="text-red-500 mt-1 mb-2">{error}</div>

        <button
          className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
