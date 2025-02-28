import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usePageParams = (currentPage: number, entriesPerPage: number) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`?page=${currentPage}&entriesPerPage=${entriesPerPage}`, {
      replace: true,
    });
  }, [currentPage, entriesPerPage, navigate]);
};

export default usePageParams;
