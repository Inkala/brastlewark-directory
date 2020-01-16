import React from 'react';
import { NavLink } from 'react-router-dom';

import SearchBar from '../../components/SearchBar/SearchBar';
import classes from './NavBar.module.scss';

const NavBar = () => {
  return (
    <nav className={classes.navBar}>
      <NavLink to="/">
        <img
          src="/logo512.png"
          alt="Brastlewark logo"
          className={classes.logo}
        />
      </NavLink>
      <SearchBar />
    </nav>
  );
};

export default NavBar;
