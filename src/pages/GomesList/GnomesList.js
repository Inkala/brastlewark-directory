import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../store/actions/actions';
import classes from './GnomesList.module.scss';
import GnomeCard from '../../components/GnomeCard/GnomeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Pagination/Pagination';
import ServerError from '../../components/ServerError/ServerError';

const GnomesList = () => {
  const dispatch = useDispatch();
  const { gnomes, searchTerm, loading, error } = useSelector(state => state);

  // Gnomes to show after filter and pagination
  const [displayedGnomes, setDisplayedGnomes] = useState([]);
  // Gnomes to use on pagination
  const [filteredGnomes, setFilteredGnomes] = useState(null);
  // Total amount of gnomes to calculate amount of pages
  const [totalGnomes, setTotalGnomes] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 30;

  const handlePageChange = currentPage => {
    setCurrentPage(currentPage);
    handlePagination(currentPage);
  };

  const handleGnomesFilter = useCallback(
    searchTerm => {
      const filteredGnomes = gnomes.filter(({ name }) =>
        name.toLowerCase().match(searchTerm)
      );
      setFilteredGnomes(filteredGnomes);
      setCurrentPage(1);
    },
    [gnomes]
  );

  const handlePagination = useCallback(
    currentPage => {
      const startCard = currentPage - 1;
      const displayedGnomes = filteredGnomes.slice(
        startCard,
        startCard + cardsPerPage
      );
      setDisplayedGnomes(displayedGnomes);
      setTotalGnomes(filteredGnomes.length);
    },
    [filteredGnomes]
  );

  useEffect(() => {
    dispatch(actions.getAllGnomes());
  }, [dispatch]);

  useEffect(() => {
    setFilteredGnomes(gnomes);
  }, [gnomes]);

  useEffect(() => {
    if (filteredGnomes) {
      handlePagination(currentPage);
    }
  }, [handlePagination, filteredGnomes, currentPage]);

  useEffect(() => {
    handleGnomesFilter(searchTerm);
  }, [handleGnomesFilter, searchTerm, gnomes]);

  let gnomesList = (
    <p>This gnome doesn't live here. Please try another name...</p>
  );

  if (displayedGnomes && displayedGnomes.length) {
    gnomesList = (
      <section className={classes.gnomesWrapper}>
        {displayedGnomes.map(gnome => (
          <Link to={`/gnomes/${gnome.id}`} key={gnome.id}>
            <GnomeCard gnome={gnome} />
          </Link>
        ))}
      </section>
    );
  }

  const spinner = (
    <div className={classes.loading}>
      <img src="/img/loading.gif" alt="loading" />
    </div>
  );

  return error ? (
    <ServerError />
  ) : (
    <main className={classes.gnomesList}>
      <SearchBar />
      <h1>Welcome to Brastlewark!</h1>
      {loading || (!displayedGnomes.length && !searchTerm) ? (
        spinner
      ) : (
        <React.Fragment>
          {gnomesList}
          <nav>
            <Pagination
              totalCards={totalGnomes}
              cardsPerPage={cardsPerPage}
              paginationHandler={handlePageChange}
              currentPage={currentPage}
            />
          </nav>
        </React.Fragment>
      )}
    </main>
  );
};

export default GnomesList;
