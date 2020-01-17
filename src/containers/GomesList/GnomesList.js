import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../store/actions/actions';
import classes from './GnomesList.module.scss';
import GnomeCard from '../../components/GnomeCard/GnomeCard';
import SearchBar from '../../components/SearchBar/SearchBar';

class GnomesList extends Component {
  state = {
    gnomes: null
  };

  componentDidMount() {
    this.props.onGetGnomes();
    this.setState({ gnomes: this.props.gnomes });
  }

  render() {
    let filteredGnomes = this.props.gnomes;
    if (this.props.searchTerm) {
      filteredGnomes = this.props.gnomes.filter(({ name }) =>
        name.toLowerCase().match(this.props.searchTerm)
      );
    }
    const spinner = (
      <div className={classes.loading}>
        <img src="/img/loading.gif" alt="loading" />
      </div>
    );

    return (
      <main className={classes.gnomesList}>
        <SearchBar />
        <h1>Welcome to Brastlewark!</h1>
        {filteredGnomes && filteredGnomes.length ? (
          <section className={classes.gnomesWrapper}>
            {filteredGnomes.map(gnome => (
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
    loading: state.loading,
    searchTerm: state.searchTerm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetGnomes: () => dispatch(actions.getAllGnomes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GnomesList);
