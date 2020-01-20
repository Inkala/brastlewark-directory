import React from 'react';
import PropTypes from 'prop-types';

import classes from './Pagination.module.scss';

const Pagination = ({
  cardsPerPage,
  totalCards,
  paginationHandler,
  currentPage
}) => {
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
};

Pagination.propTypes = {
  cardsPerPage: PropTypes.number,
  totalCards: PropTypes.number,
  currentPage: PropTypes.number,
  paginationHandler: PropTypes.func,
};

export default Pagination;
