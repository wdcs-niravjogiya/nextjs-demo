// @refresh reset

"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserAlbums from "./userAlbums";
import UserTodos from "./userTodos";

export interface User {
  email: string;
  id: number;
  userId: number;
  title: string;
  body: string;
}
const postUrl = "https://jsonplaceholder.typicode.com/posts?userId=";
const albumsUrl = "https://jsonplaceholder.typicode.com/albums?userId=";
const todosUrl = "https://jsonplaceholder.typicode.com/todos?userId=";

export default function Dashboard() {
  const [user, setUser] = useState<User[]>([]);
  const [userPost, setUserPost] = useState<User[]>([]);
  const [userAlbum, setUserAlbum] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [showPostData, setShowPostData] = useState(false);
  const [showAlbumData, setShowAlbumData] = useState(false);
  const [showTodosData, setShowTodosData] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : [];
    setUser(parsedUserData);
    console.log("parsedUserData", parsedUserData);
    const fetchData = async () => {
      try {
        if (parsedUserData.length > 0) {
          console.log("In parsedUserData");
          const userPost = await axios.get(
            `${postUrl}${parsedUserData[0]?.id}`
          );
          setUserPost(userPost.data);
          console.log("userPost", userPost.data);

          const userAlbum = await axios.get(
            `${albumsUrl}${parsedUserData[0]?.id}`
          );
          setUserAlbum(userAlbum.data);
          console.log("userAlbum", userAlbum.data);

          const userTodos = await axios.get(
            `${todosUrl}${parsedUserData[0]?.id}`
          );
          setUserTodos(userTodos.data);
          console.log("userTodos", userTodos.data[0].completed);
          setLoading(false);
        } else {
          console.log("No parsedUserData");
        }
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.status);
        } else {
          console.error("error during feching data", error.response);
        }
      }
    };
    fetchData();
  }, []);

  const getUserPost = () => {
    router.push("dashboard/user-posts");
  };

  const getUserAlbum = () => {};

  const getUserTodos = () => {};

  const handleLogout = () => {
    router.push("/");
    localStorage.removeItem("userData");
    setUser([]);
  };

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
          <div className="flex flex-wrap gap-4 justify-center pt-32">
            <div className="font-semibold text-xl tracking-tight text-white w-full text-center">
              Email: {user.length > 0 ? user[0]?.email : "nouser"}
            </div>
            <div className="font-semibold text-xl tracking-tight text-white w-full text-center">
              <button onClick={handleLogout}> Logout</button>
            </div>
            <div
              onClick={getUserPost}
              className={`${
                showPostData ? "!bg-red-500" : "bg-gray-600"
              } flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 w-[240px] bg-gray-600 backdrop-filter backdrop-blur-lg`}
            >
              <div className="font-semibold text-5xl tracking-tight">
                {userPost.length}
              </div>
              <div className="font-normal">Total Posts</div>
            </div>

            <div
              onClick={getUserAlbum}
              className={`${
                showAlbumData ? "!bg-red-500" : "bg-gray-600"
              } flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 w-[240px] bg-gray-600 backdrop-filter backdrop-blur-lg`}
            >
              <div className="font-semibold text-5xl tracking-tight">
                {userAlbum.length}
              </div>
              <div className="font-normal">Total Albums</div>
            </div>
            <div
              onClick={getUserTodos}
              className={`${
                showTodosData ? "!bg-red-500" : "bg-gray-600"
              } flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 w-[240px] bg-gray-600 backdrop-filter backdrop-blur-lg`}
            >
              <div className="font-semibold text-5xl tracking-tight">
                {userTodos.length}
              </div>
              <div className="font-normal">Todo List</div>
            </div>
          </div>
          {/* {showPostData && <UserPosts userPost={userPost} />}
          {showAlbumData && <UserAlbums userAlbum={userAlbum} />}
          {showTodosData && <UserTodos userTodos={userTodos} />} */}
        </div>
      )}
    </>
  );
}
