import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import * as actions from '../../store/actions/actions';
import classes from './GnomesDetails.module.scss';

export class GnomeDetails extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.onGetOneGnome(id);
  }

  goBackHandler = () => {
    this.props.history.goBack();
  }

  render() {
    const { gnome } = this.props;
    const gnomeImg = { backgroundImage: `url(${gnome.thumbnail})` };
    const spinner = (
      <div className={classes.loading}>
        <img src="/img/loading.gif" alt="loading" />
      </div>
    );

    let professions = <small>No jobs so far...</small>;
    let friends = <small>No friends to show...</small>;

    if (gnome.professions && gnome.professions.length) {
      professions = gnome.professions.map(profession => {
        const id = shortid.generate();
        return (
          <li key={id} className={classes.infoItem}>
            {profession}
          </li>
        );
      });
    }

    if (gnome.friends && gnome.friends.length) {
      friends = gnome.friends.map(friend => {
        const id = shortid.generate();
        return (
          <li key={id} className={classes.infoItem}>
            {friend}
          </li>
        );
      });
    }

    return (
      <section className={classes.gnomeDetails}>
        <h1>{gnome.name}</h1>
        {gnome.name ? (
          <section className={classes.gnomeDetailsWrapper}>
            <div className={classes.gnomeImage} style={gnomeImg}></div>
            <section className={classes.gnomeInfo}>
              <p><strong>Race:</strong> Gnome</p>
              <p><strong>Gender:</strong> {gnome.name.length < 20 ? "Male" : "Female"}</p>
              <p><strong>Age:</strong> {gnome.age}</p>
              <p><strong>Weight:</strong> {gnome.weight.toFixed(2)} cm</p>
              <p><strong>Height:</strong> {gnome.height.toFixed(2)} kg</p>
              <p><strong>Hair Color:</strong> {gnome.hair_color}</p>
              <p><strong>Professions:</strong></p>
              <ul className={classes.professions}>{professions}</ul>
              <p><strong>Friends:</strong></p>
              <ul className={classes.friends}>{friends}</ul>
            </section>
          </section>
        ) : (
          spinner
          )}
          <button onClick={this.goBackHandler}>
            <FontAwesomeIcon icon={faArrowLeft} />Go Back
          </button>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    gnome: state.oneGnome,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetOneGnome: gnomeId => dispatch(actions.getOneGnome(gnomeId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GnomeDetails);
