import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    console.log(gnomes);
    return (
      <main className={classes.gnomesList}>
        <h1>Gnomes List</h1>
        {gnomes && gnomes.length ? (
          <section className={classes.gnomesWrapper}>
            {gnomes.map(gnome => (
              <GnomeCard key={gnome.id} gnome={gnome} />
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
