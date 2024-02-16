import Pagination from "@/components/pagination/Pagination";
import React, { useState } from "react";

interface Props {
  userPost: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[];
}
const UserPosts = ({ userPost }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handleChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

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
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((postList, Id) => (
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
        <Pagination
          pageCount={Math.ceil(userPost.length / itemsPerPage)}
          onPageChange={handleChange}
        />
      </div>
    </div>
  );
};

export default UserPosts;
