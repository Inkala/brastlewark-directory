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
  }

  componentDidUpdate(prevProps) {
    // console.log('Props', this.props.searchTerm);
    // console.log('Prev', prevProps.searchTerm);
    if (this.props.gnomes !== prevProps.gnomes) {
      this.setState({ gnomes: this.props.gnomes });
    }
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.filterGnomesHandler(this.props.searchTerm);
    }
  }

  filterGnomesHandler = searchTerm => {
    const filteredGnomes = this.props.gnomes.filter(({ name }) =>
      name.toLowerCase().match(this.props.searchTerm)
    );
    this.setState({ gnomes: filteredGnomes });
  };

  render() {
    console.log('State:', this.state);
    const { gnomes } = this.state;
    let gnomesList = <p>This gnome doesn't live here. Please try another name...</p>;
    if (gnomes && gnomes.length) {
      gnomesList = gnomes.map(gnome => (
        <Link to={`/gnomes/${gnome.id}`} key={gnome.id}>
          <GnomeCard gnome={gnome} />
        </Link>
      ));
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
        {gnomes ? (
          <section className={classes.gnomesWrapper}>{gnomesList}</section>
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
