import React, { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  pageNumbers: (number | string)[];
}

const Pagination: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  pageNumbers,
}) => {
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, setCurrentPage]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, setCurrentPage, totalPages]);

  const handlePageClick = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const paginationButtonsClass =
    "p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 cursor-pointer";

  return totalPages > 1 ? (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* Previous Page Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={paginationButtonsClass}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Page Number Buttons */}
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => {
            if (typeof page === "number") {
              handlePageClick(page);
            }
          }}
          className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
            page === currentPage
              ? "bg-gray-300 text-gray-500"
              : "hover:bg-gray-100"
          } ${typeof page !== "number" ? "cursor-default" : ""}`}
          disabled={typeof page !== "number"}
        >
          {page}
        </button>
      ))}

      {/* Next Page Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={paginationButtonsClass}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  ) : null;
};

export default Pagination;
