import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import * as actions from '../../store/actions/actions';
import classes from './GnomesList.module.scss';
import GnomeCard from '../../components/GnomeCard/GnomeCard';

class GnomesList extends Component {
  componentDidMount() {
    this.props.onGetGnomes();
  }

  render() {
    const { gnomes } = this.props;    
    const spinner = (
      <div className={classes.loading}>
        <img src="/img/loading.gif" alt="loading" />
      </div>
    );
    return (
      <main className={classes.gnomesList}>
        <h1>Welcome to Brastlewark!</h1>
        {gnomes && gnomes.length ? (
          <section className={classes.gnomesWrapper}>
            {gnomes.map(gnome => (
              <Link to={`/gnomes/${gnome.id}`} key={gnome.id}>
                <GnomeCard gnome={gnome} />
              </Link>
            ))}
          </section>
        ) : (
          spinner
        )}
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    gnomes: state.gnomes,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetGnomes: () => dispatch(actions.getAllGnomes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GnomesList);
