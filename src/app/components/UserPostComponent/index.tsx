"use client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import axios from "axios";
import {
  useParams,
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { columnData } from "./columns";

export type UserPost = {
  UserId: number;
  No: number;
  title: string;
  body: string;
};

const postUrl = "https://jsonplaceholder.typicode.com/posts?userId=";
const UserPostComponent = () => {
  const newParams = useSearchParams();
  const [loading, setLoading] = useState(true);

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
  const itemsPerPage = 5;

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : [];
    setUser(parsedUserData);
    const fetchData = async () => {
      try {
        if (parsedUserData.length > 0) {
          const userId = parsedUserData[0]?.id;
          const userPostData = await axios.get(`${postUrl}${userId}`);
          const userPost = await userPostData.data;
          setUserPost(userPost);
          setLoading(false);
        } else {
          setLoading(true);
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
  const [sorting, setSorting] = useState([]);
  const data = userPost;
  const columns = columnData;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

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
        <div className="flex flex-col m-auto">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <h1 className="text-white my-5 font-bold">Total Posts</h1>
              <div className="overflow-hidden text-white">
                <table className="w-full">
                  <thead className="bg-white border-b">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            onClick={header.column.getToggleSortingHandler()}
                            key={header.id}
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left cursor-pointer"
                          >
                            {header.isPlaceholder ? null : (
                              <>
                                <span>
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                </span>
                                <span className="ml-2 text-red-600">
                                  {
                                    { asc: "asc", desc: "desc" }[
                                      header.column.getIsSorted() ?? null
                                    ]
                                  }
                                </span>
                              </>
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="bg-gray-100 border-b">
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="pagination_controls">
            <button
              className={`${
                !table.getCanPreviousPage() ? "disabled" : "active"
              }`}
              onClick={() => table.setPageIndex(0)}
            >
              First
            </button>
            <button
              className={`${
                !table.getCanPreviousPage() ? "disabled" : "active"
              }`}
              onClick={() => table.previousPage()}
            >
              Prev
            </button>
            <button
              className={`${!table.getCanNextPage() ? "disabled" : "active"}`}
              onClick={() => table.nextPage()}
            >
              Next
            </button>
            <button
              className={`${!table.getCanNextPage() ? "disabled" : "active"}`}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              Last
            </button>
            <button onClick={() => table.setPageSize(2)}>Page</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPostComponent;
