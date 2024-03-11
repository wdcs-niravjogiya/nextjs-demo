import Pagination from "@/app/components/pagination/Pagination";
import React, { useState } from "react";

interface Props {
  userAlbum: {
    userId: number;
    id: number;
    title: string;
  }[];
}
const UserAlbums = ({ userAlbum }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handleChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 sm:px-6 lg:px-8">
        <div className="py-2 inline-block min-w-full">
          <h1 className="text-white my-5">Total Albums</h1>
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
                </tr>
              </thead>
              <tbody>
                {userAlbum
                  ?.slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((albumList, Id) => (
                    <tr key={Id} className="bg-gray-100 border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {albumList.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {albumList.id}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {albumList.title}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          pageCount={Math.ceil(userAlbum.length / itemsPerPage)}
          onPageChange={handleChange}
        />
      </div>
    </div>
  );
};

export default UserAlbums;
