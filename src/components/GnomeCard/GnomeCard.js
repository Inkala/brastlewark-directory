import React from 'react';
import PropTypes from 'prop-types';

import classes from './GnomeCard.module.scss';

const GnomeCard = props => {
  const { gnome } = props;

  // Just a random way to add a gender for the card
  const gender = gnome.name.length < 20 ? 'Male' : 'Female';
  
  const gnomeImg = { backgroundImage: `url(${gnome.thumbnail})` };
  return (
    <article className={classes.gnomeCard}>
      <div className={classes.gnomeImage} style={gnomeImg}></div>
      <div className={classes.gnomeInfo}>
      <h3>{gnome.name}</h3>
      <p>{gender}</p>
      </div>
    </article>
  );
};

GnomeCard.propTypes = {
  gnome: PropTypes.object
};

export default GnomeCard;
