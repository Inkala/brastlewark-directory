import React from 'react';
import classes from './ServerError.module.scss';

const ServerError = () => {
  return (
    <section className={classes.serverError}>
      <p>
        Opps... There was an error while finding the gnomes. Maybe the orcs are
        attacking.
      </p>
      <p>Please try again later.</p>
    </section>
  );
};

export default ServerError;
