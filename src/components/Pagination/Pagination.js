import React from 'react';
import classes from './Pagination.module.scss';

function Pagination({
  cardsPerPage,
  totalCards,
  paginationHandler,
  currentPage
}) {
  const pageNumbers = [];
  const pagesAmount = Math.ceil(totalCards / cardsPerPage);
  for (let i = 1; i <= pagesAmount; i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className={classes.pagination}>
      {pageNumbers.map(num => (
        <li key={num} className={classes.pageButton}>
          <button
            className={num === currentPage ? classes.active : null}
            onClick={() => paginationHandler(num)}
          >
            {num}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
