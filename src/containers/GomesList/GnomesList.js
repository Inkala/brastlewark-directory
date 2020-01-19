import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../store/actions/actions';
import classes from './GnomesList.module.scss';
import GnomeCard from '../../components/GnomeCard/GnomeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Pagination/Pagination';

class GnomesList extends Component {
  state = {
    gnomes: null,
    cardsPerPage: 30,
    pagesAmount: 0,
    currentPage: 1
  };

  componentDidMount() {
    this.props.onGetGnomes();
  }

  componentDidUpdate(prevProps) {
    if (this.props.gnomes !== prevProps.gnomes) {
      this.handlePagination();
    }
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.filterGnomesHandler(this.props.searchTerm);
    }
  }

  handlePagination = (currentPage = 1) => {
    const { cardsPerPage } = this.state;
    const cardStart = currentPage - 1;
    const gnomes = this.props.gnomes.slice(cardStart, cardStart + cardsPerPage);
    this.setState({ gnomes, currentPage });
  };

  filterGnomesHandler = searchTerm => {
    const filteredGnomes = this.props.gnomes.filter(({ name }) =>
      name.toLowerCase().match(searchTerm)
    );
    this.setState({ gnomes: filteredGnomes });
  };

  render() {
    const { gnomes, cardsPerPage, currentPage } = this.state;
    let gnomesList = (
      <p>This gnome doesn't live here. Please try another name...</p>
    );
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
          <React.Fragment>
            <section className={classes.gnomesWrapper}>{gnomesList}</section>
            <nav>
              <Pagination
                totalCards={this.props.gnomes.length}
                cardsPerPage={cardsPerPage}
                paginationHandler={this.handlePagination}
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
