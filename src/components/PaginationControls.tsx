"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";

interface Props {
  totalPages: ReactNode;
  hasPrevPage: ReactNode;
  hasNextPage: ReactNode;
}
const PaginationControls = ({
  totalPages,
  hasPrevPage,
  hasNextPage,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const per_page = searchParams.get("per_page") || 3;
  const handlePrev = () => {
    const prevPage = Number(page) - 1;
    if (prevPage >= 1) {
      router.push(
        `/dashboard/user-posts/?page=${prevPage}&per_page=${per_page}`
      );
    }
  };
  const handleNext = () => {
    const nextPage = Number(page) + 1;
    router.push(`/dashboard/user-posts/?page=${nextPage}&per_page=${per_page}`);
  };

  return (
    <div>
      <button
        onClick={handlePrev}
        className="bg-gray-400 p-2"
        disabled={!hasPrevPage}
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        className="bg-gray-400 p-2"
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
