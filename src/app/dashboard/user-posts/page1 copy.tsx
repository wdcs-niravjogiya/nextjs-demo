"use client";
import Pagination from "@/components/pagination/Pagination";
import { useEffect, useState } from "react";

interface Props {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const postUrl = "https://jsonplaceholder.typicode.com/posts?userId=";
const UserPosts = ({ searchParams }: any) => {
  let currentPage: number = 1;
  const dataPerPage: number = 5;
  let totalPages: number = 0;
  const [userPost, setUserPost] = useState<Props[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserData = localStorage.getItem("userData");
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : [];
        console.log("parsedUserData", parsedUserData);
        const userId = parsedUserData[0]?.id;
        const res: Response = await fetch(`${postUrl}${userId}`);
        const data = await res.json();
        setUserPost(data);
        if (Number(searchParams.page) >= 1) {
          currentPage = Number(searchParams.page);
        }
        let offset: number = (currentPage - 1) * dataPerPage;
        console.log("currentPage", currentPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const totalPages: number = Math.ceil(userPost?.length / dataPerPage);
    console.log("getData", userPost);
    console.log("totalPages", totalPages);
    let pageNumbere: any[] = [];

    fetchData();
  }, [searchParams.page, totalPages, setUserPost]);
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 sm:px-6 lg:px-8">
        <div className="py-2 inline-block min-w-full">
          <h1 className="text-white my-5">Total Posts</h1>
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    User&nbsp;Id
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    No.
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Body
                  </th>
                </tr>
              </thead>
              <tbody>
                {userPost
                  ?.slice(
                    (currentPage - 1) * dataPerPage,
                    currentPage * dataPerPage
                  )
                  .map((postList: Props, Id: number) => (
                    <tr key={Id} className="bg-gray-100 border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {postList.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {postList.id}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {postList.title}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {postList.body}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <Pagination pageCount={totalPages} /> */}
      </div>
    </div>
  );
};

export default UserPosts;
