"use client";
import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import SessionClient from "./nextauth/SessionClient";
const userURL = "https://jsonplaceholder.typicode.com/users?email=";
const postUrl = "https://jsonplaceholder.typicode.com/posts?userId=";
function Login() {
  const [user, setUser] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const session = SessionClient("");
  const router = useRouter();
  const fetchUserData = async () => {
    try {
      const response = axios.get(`${userURL}${userInput}`);
      setUser((await response).data);
      console.log("Login Page", (await response).data);
      localStorage.setItem("userData", JSON.stringify((await response).data));
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Email not found"); // Set error message
    }
  };

  const handleOnChange = (e: any) => {
    const value = e.target.value;
    setUserInput(value);
    localStorage.setItem("userData", value);
  };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   fetchUserData();
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUserData();

    // console.log("Fetching user data...");
    // const response = await axios.get(`${userURL}${email}`);
    // const userData = response.data;

    // console.log("User data:", userData);

    // setUser(userData);
    // localStorage.setItem("userData", JSON.stringify(userData));

    console.log("Signing in...");
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const res = await signIn("credentials", {
        email,
        redirect: false,
        callbackUrl: "/dashboard",
      });
      console.log("Signing in", res);
      if (res?.error) {
        setError("Invalid credentials");
      } else {
        if (
          userInput.trim() !== "" &&
          session !== "" &&
          session !== undefined
        ) {
          router.push("/dashboard");
        } else {
          alert("Please enter email Id");
          router.push("/");
        }
      }
    } catch (err) {
      console.log("catch Signing in", err);
    }

    // console.log("SignIn response:", signInResponse);

    // if (!signInResponse?.error) {
    // console.log("Redirecting to /dashboard...");
    // router.push("/dashboard");
    // router.refresh();
    // }
  };

  const handleLogin = () => {
    // if (userInput.trim() !== "" && session !== "" && session !== undefined) {
    //   router.push("/dashboard");
    // } else {
    //   alert("Please enter email Id");
    //   router.push("/");
    // }
  };

  if (!user) return null;
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4 ">
            <div className="relative bg-blue-50 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign In
                  </h6>
                </div>
                <div className="btn-wrapper text-center"></div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>Or sign in with credentials</small>
              </div> */}
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      // value={userInput}
                      onChange={handleOnChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      name="email"
                    />
                  </div>
                  <div className="text-center mt-6">
                    {/* <div className="text-red-500 text-center mt-2">
                      Error: {error}
                    </div> */}

                    <button
                      // onClick={handleLogin}
                      className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
