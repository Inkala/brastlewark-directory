import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../../store/actions/actions';
import classes from './GnomesDetails.module.scss';
import ServerError from '../../components/ServerError/ServerError';

const GnomeDetails = props => {
  const { id } = props.match.params;

  const dispatch = useDispatch();
  const { oneGnome, friendsList, loading, error } = useSelector(state => state);

  useEffect(() => {
    
    dispatch(actions.getOneGnome(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (oneGnome.friends) {
      dispatch(actions.getFriendsList(oneGnome.friends));
    }
  }, [oneGnome.friends, dispatch]);

  const gnomeImg = { backgroundImage: `url(${oneGnome.thumbnail})` };

  let professions = <small>No jobs so far...</small>;
  let friends = <small>No friends to show...</small>;

  if (oneGnome.professions && oneGnome.professions.length) {
    professions = oneGnome.professions.map(profession => {
      const id = shortid.generate();
      return (
        <li key={id} className={classes.infoItem}>
          {profession}
        </li>
      );
    });
  }

  if (friendsList && friendsList.length) {
    friends = friendsList.map(friend => (
      <li key={friend.id} className={classes.infoItem}>
        <Link to={`/gnomes/${friend.id}`}>{friend.name}</Link>
      </li>
    ));
  }

  const spinner = (
    <div className={classes.loading}>
      <img src="/img/loading.gif" alt="loading" />
    </div>
  );

  return error ? (
    <section className={classes.gnomeDetails}>
      <ServerError />
    </section>
  ) : (
    <section className={classes.gnomeDetails}>
      <h1>{oneGnome.name}</h1>
      {loading || !oneGnome.name ? (
        spinner
      ) : (
        <section className={classes.gnomeDetailsWrapper}>
          <div className={classes.gnomeImage} style={gnomeImg}></div>
          <section className={classes.gnomeInfo}>
            <p>
              <strong>Race:</strong> Gnome
            </p>
            <p>
              <strong>Gender:</strong>
              {oneGnome.name.length < 20 ? 'Male' : 'Female'}
            </p>
            <p>
              <strong>Age:</strong> {oneGnome.age}
            </p>
            <p>
              <strong>Weight:</strong> {oneGnome.weight.toFixed(2)} kg
            </p>
            <p>
              <strong>Height:</strong> {Math.round(oneGnome.height)} cm
            </p>
            <p>
              <strong>Hair Color:</strong> {oneGnome.hair_color}
            </p>
            <p>
              <strong>Professions:</strong>
            </p>
            <ul className={classes.professions}>{professions}</ul>
            <p>
              <strong>Friends:</strong>
            </p>
            <ul className={classes.friends}>{friends}</ul>
          </section>
        </section>
      )}
      <button onClick={props.history.goBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Go Back
      </button>
    </section>
  );
};

export default GnomeDetails;
