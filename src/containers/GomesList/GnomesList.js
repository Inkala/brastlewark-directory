import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as actions from '../../store/actions/actions';
import classes from './GnomesList.module.scss';
import GnomeCard from '../../components/GnomeCard/GnomeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Pagination/Pagination';

class GnomesList extends Component {
  state = {
    displayedGnomes: [], // Gnomes to show after filter and pagination
    filteredGnomes: null, // Gnomes to use on pagination
    cardsPerPage: 30, // Number of cards per page
    totalGnomes: 0, // Total amount of gnomes to calculate amount of pages
    currentPage: 1
  };

  componentDidMount() {
    this.props.onGetGnomes();
  }

  componentDidUpdate(prevProps, prevState) {
    const { gnomes, searchTerm } = this.props;
    const { currentPage, filteredGnomes } = this.state;

    if (gnomes !== prevProps.gnomes) {
      this.setState({ filteredGnomes: gnomes });
    }
    if (filteredGnomes !== prevState.filteredGnomes) {
      this.handlePagination(currentPage);
    }

    if (searchTerm !== prevProps.searchTerm) {
      this.handleGnomesFilter(searchTerm);
    }
  }

  handlePageChange = currentPage => {
    this.setState({ currentPage });
    this.handlePagination(currentPage);
  };

  handlePagination = currentPage => {
    const { cardsPerPage, filteredGnomes } = this.state;
    const startCard = currentPage - 1;
    const displayedGnomes = filteredGnomes.slice(
      startCard,
      startCard + cardsPerPage
    );

    this.setState({ displayedGnomes, totalGnomes: filteredGnomes.length });
  };

  handleGnomesFilter = searchTerm => {
    const filteredGnomes = this.props.gnomes.filter(({ name }) =>
      name.toLowerCase().match(searchTerm)
    );
    this.setState({ filteredGnomes, currentPage: 1 });
  };

  render() {
    const { displayedGnomes, cardsPerPage, currentPage } = this.state;
    let gnomesList = (
      <p>This gnome doesn't live here. Please try another name...</p>
    );
    if (displayedGnomes && displayedGnomes.length) {
      gnomesList = displayedGnomes.map(gnome => (
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

    // console.log('Gnomes:', this.state.gnomes);
    return (
      <main className={classes.gnomesList}>
        <SearchBar />
        <h1>Welcome to Brastlewark!</h1>
        {displayedGnomes ? (
          <React.Fragment>
            <section className={classes.gnomesWrapper}>{gnomesList}</section>
            <nav>
              <Pagination
                totalCards={this.state.totalGnomes}
                cardsPerPage={cardsPerPage}
                paginationHandler={this.handlePageChange}
                currentPage={currentPage}
              />
            </nav>
          </React.Fragment>
        ) : (
          spinner
        )}
      </main>
    );
  }
}

GnomesList.propTypes = {
  gnomes: PropTypes.array,
  loading: PropTypes.bool,
  searchTerm: PropTypes.string,
  onGetGnomes: PropTypes.func
};

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
