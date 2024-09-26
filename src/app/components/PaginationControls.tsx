"use client";
import { log } from "console";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

interface Props {
  totalPages: ReactNode;
  hasPrevPage: ReactNode;
  hasNextPage: ReactNode;
  className?: string;
}
const PaginationControls = ({
  totalPages,
  hasPrevPage,
  hasNextPage,
  className,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let page = searchParams.get("page") || 1;
  const per_page = searchParams.get("per_page") || 5;
  // console.log("page---", page);

  const handlePrev = () => {
    const prevPage = Number(page) - 1;
    if (prevPage >= 1) {
      router.push(`/user-posts/?page=${prevPage}&per_page=${per_page}`);
    }
  };

  let pageNumbers: any[] = [];
  for (let i = 1; i < Number(totalPages) / Number(per_page) + 1; i++) {
    // if (i < 1) continue;
    // if (i > Number(totalPages)) break;
    pageNumbers.push(i);
    console.log("pageNumbers", pageNumbers);
  }

  let totalPagesCount: any[] = [];
  for (let i = 1; i < Number(totalPages); i++) {
    i = i + 4;
    totalPagesCount.push(i);
  }

  const handleNext = () => {
    const nextPage = Number(page) + 1;
    router.push(`/user-posts/?page=${nextPage}&per_page=${per_page}`);
  };

  const [value, setValue] = useState(per_page);
  const handleChangeEvent = (e: any) => {
    let selectedValue = e.target.value;
    if (selectedValue !== per_page) {
      page = 1;
    }
    setValue(selectedValue);
    router.push(`/user-posts?page=${page}&per_page=${selectedValue}`);
    console.log("value", selectedValue);
  };

  return (
    <div className="pagination_controls">
      <button
        onClick={handlePrev}
        className={`${hasPrevPage ? "active" : "disabled"}`}
        disabled={!hasPrevPage}
      >
        Previous
      </button>
      <div className="text-white space-x-3">
        {pageNumbers.map((pageNum) => (
          <Link
            key={pageNum}
            className={`${pageNum == page ? "active" : ""}`}
            href={`/user-posts/?page=${pageNum}&per_page=${per_page}`}
          >
            {pageNum}
          </Link>
        ))}
        {/* {page} / {Math.ceil(Number(totalPages) / Number(per_page))} */}
      </div>

      <button
        onClick={handleNext}
        className={`${hasNextPage ? "active" : "disabled"}`}
        disabled={!hasNextPage}
      >
        Next
      </button>
      <select value={value} onChange={handleChangeEvent}>
        {totalPagesCount.map((page) => (
          <option value={page}>{page}</option>
        ))}
      </select>
    </div>
  );
};

export default PaginationControls;
