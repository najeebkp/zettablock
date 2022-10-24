import React from "react";
import { Row, Button } from "./PaginationStyles";

function Pagination({ pages, currentPage, handlePageChange, setCurrentPage }) {
  console.log("pages", pages);
  console.log("current page", currentPage);
  const pageNumbers = [...Array(pages + 1).keys()].slice(1);
  const handlePage = (key) => {
    if (key == "next") {
      if (currentPage < pages) {
        setCurrentPage(currentPage + 1);
      }
    } else if (key == "prev") {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } else {
      setCurrentPage(key);
    }
  };
  return (
    <Row>
      <Button onClick={() => handlePage("prev")}>Prev page</Button>
      {pageNumbers.map((item) => (
        <Button
          active={currentPage == item ? true : false}
          onClick={() => handlePage(item)}
        >
          {item}
        </Button>
      ))}
      <Button onClick={() => handlePage("next")}>Next page</Button>
    </Row>
  );
}

export default Pagination;
