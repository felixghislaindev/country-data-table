import { useEffect } from "react";

const usePageReset = (
  currentPage: number,
  validTotalPages: number,
  setCurrentPage: (page: number) => void
) => {
  useEffect(() => {
    if (currentPage > validTotalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, validTotalPages, setCurrentPage]);
};

export default usePageReset;
