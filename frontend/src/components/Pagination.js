import React from 'react';

const Pagination = ({ itemPerPage, totalItem, paginate, current }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItem / itemPerPage); i++) {
    // Get all pages
    pageNumbers.push(i)
  }
  return (
    <ul className="navigation">
      {/* Show all pages and change current page with paginate */}
      {pageNumbers.map(number => (
        <li key={number}><button className={number === current ? "active" : ""} onClick={() => paginate(number)}>{number}</button></li>
      ))
      }
    </ul>
  );
}

export default Pagination;