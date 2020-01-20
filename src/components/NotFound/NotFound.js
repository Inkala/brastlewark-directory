import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NotFound.module.scss';

const NotFound = props => {
  return (
    <section className={classes.notFound}>
      <div className={classes.notFoundWrapper}>
        <img src="img/gnome-character.jpg" alt='' />
        <div>
          <h2>~ 404 ~</h2>
          <h3>Are you lost, traveler?</h3>
          <p>Please try anorher route.</p>
          <Link to="/">Go back to safety</Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
