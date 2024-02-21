import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  ip?: string;
}
const Pagination = ({ pageCount, ip }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  console.log("page====", page);

  const handlePageChange = (selectedPage: { selected: number }) => {
    // Update the URL with the new page number as a query parameter
    router.push(`/dashboard/user-posts/?page=${selectedPage.selected + 1}`);
  };
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageChange}
      activeClassName="active"
      className="pagination_wrap"
    />
  );
};
export default Pagination;
