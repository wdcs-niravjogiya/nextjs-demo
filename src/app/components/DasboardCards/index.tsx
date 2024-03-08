// @refresh reset

"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { API_LIST } from "@/util/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface User {
  email: string;
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default function DashboardCards() {
  const [user, setUser] = useState<User[]>([]);
  const [userPost, setUserPost] = useState<User[]>([]);
  const [userAlbum, setUserAlbum] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const notifySuccess = () => toast.success("API call successfull!");
  const notifyError = () => toast.error("API call failed!");
  const router = useRouter();
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : [];
    setUser(parsedUserData);
    const fetchData = async () => {
      try {
        if (parsedUserData.length > 0) {
          const userPostResponse = await fetch(
            `${API_LIST.USER_POST}${parsedUserData[0]?.id}`
          );
          const userPostData = await userPostResponse.json();
          setUserPost(userPostData);

          const userAlbumResponse = await fetch(
            `${API_LIST.USER_ALBUM}${parsedUserData[0]?.id}`
          );

          const userAlbumData = await userAlbumResponse.json();
          setUserAlbum(userAlbumData);

          const userTodosResponse = await fetch(
            `${API_LIST.USER_TODO}${parsedUserData[0]?.id}`
          );

          const userTodosData = await userTodosResponse.json();
          setUserTodos(userTodosData);
          setUserTodos(userTodosData);
          setLoading(false);
          console.log("userPostData", userPostData);
          if (userPostResponse.ok) {
            notifySuccess();
          } else {
            notifyError();
          }
        } else {
        }
      } catch (error: any) {
        notifyError();
        console.error("error during feching data", error.response);
      }
    };
    fetchData();
  }, []);

  const getUserPost = () => {
    router.push("user-posts");
  };

  const getUserAlbum = () => {};

  const getUserTodos = () => {};

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen max-w-[1200px] m-auto">
          <div className="flex flex-wrap gap-4 justify-center pt-32">
            <div className="font-semibold text-xl tracking-tight text-white w-full text-center">
              Loading...
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen max-w-[1200px] m-auto">
          <div className="flex flex-wrap gap-4 justify-center pt-12">
            <ToastContainer />

            <div
              onClick={getUserPost}
              className="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 w-[240px] bg-gray-600 backdrop-filter backdrop-blur-lg cursor-pointer"
            >
              <div className="font-semibold text-5xl tracking-tight">
                {userPost.length}
              </div>
              <div className="font-normal">Total Posts</div>
            </div>

            <div
              onClick={getUserAlbum}
              className="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 w-[240px] bg-gray-600 backdrop-filter backdrop-blur-lg"
            >
              <div className="font-semibold text-5xl tracking-tight">
                {userAlbum.length}
              </div>
              <div className="font-normal">Total Albums</div>
            </div>
            <div
              onClick={getUserTodos}
              className="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 w-[240px] bg-gray-600 backdrop-filter backdrop-blur-lg"
            >
              <div className="font-semibold text-5xl tracking-tight">
                {userTodos.length}
              </div>
              <div className="font-normal">Todo List</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
