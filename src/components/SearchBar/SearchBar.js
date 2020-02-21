import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../../store/actions/actions';
import classes from './SearchBar.module.scss';

const SearchBar = () => {
  const [inputSearch, setInputSearch] = useState('');
  const dispatch = useDispatch();

  const handleSearch = event => {
    setInputSearch(event.target.value);
    dispatch(actions.setSearchTerm(event.target.value.toLowerCase()));
  };

  return (
    <section className={classes.searchBar}>
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        value={inputSearch}
        onChange={handleSearch}
        placeholder="Search by name..."
      />
    </section>
  );
};

export default SearchBar;
