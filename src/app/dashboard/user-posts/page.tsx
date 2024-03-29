"use client";
import PaginationControls from "@/components/PaginationControls";
import Pagination from "@/components/pagination/Pagination";
import axios from "axios";
import {
  useParams,
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";
import React, { useEffect, useState } from "react";
interface Props {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const postUrl = "https://jsonplaceholder.typicode.com/posts?userId=";
const UserPosts = () => {
  const params = useParams();
  const newParams = useSearchParams();
  const pathName = usePathname();
  console.log("pathName", pathName);
  console.log("params", params);
  console.log("newparams", newParams.get("page"));

  const [user, setUser] = useState();
  const [userPost, setUserPost] = useState([]);
  const router = useRouter();

  const page = newParams.get("page") ?? "1";
  const per_page = newParams.get("per_page") || "5";
  const totalPages = userPost?.length;
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);
  const postEntries = userPost?.slice(start, end);

  const [currentPage, setCurrentPage] = useState(0);
  // const itemsPerPage = 5;

  // const handleChange = (selected: { selected: number }) => {
  //   router.push(`user-posts?page=${page + 1}`);
  //   setCurrentPage(selected.selected);
  // };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : [];
    setUser(parsedUserData);
    console.log("parsedUserData", parsedUserData);
    const fetchData = async () => {
      try {
        if (parsedUserData.length > 0) {
          const userId = parsedUserData[0]?.id;
          console.log("In parsedUserData");
          const userPost = await axios.get(`${postUrl}${userId}`);
          setUserPost(userPost.data);
          // router.push(`user-posts?page=${currentPage + 1}`);

          console.log("userPost", userPost.data);
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
  }, [currentPage, router]);

  return (
    <div className="flex flex-col max-w-[1200px] m-auto">
      <div className="overflow-x-auto ">
        <div className="inline-block min-w-full">
          <h1 className="text-white my-5 font-bold">Total Posts</h1>
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
                {postEntries.map((postList, Id: number) => (
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

        {/* <Pagination pageCount={Math.ceil(userPost?.length / itemsPerPage)} /> */}
      </div>
      <PaginationControls
        totalPages={totalPages}
        hasPrevPage={start > 0}
        hasNextPage={end < userPost.length}
        className="pagination_controls"
      />
    </div>
  );
};

export default UserPosts;
