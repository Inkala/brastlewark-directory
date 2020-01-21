import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavBar.module.scss';

const NavBar = () => {
  return (
    <nav className={classes.navBar}>
      <NavLink className='test' to="/">
        <img
          src="/img/logo.png"
          alt="Brastlewark logo"
          className={classes.logo}
        />
      </NavLink>
    </nav>
  );
};

export default NavBar;
