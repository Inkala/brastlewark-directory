import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../../store/actions/actions';
import classes from './SearchBar.module.scss';

class SearchBar extends Component {
  state = {
    inputSearch: ''
  }
  
  handleSearch = event => {
    this.setState({ inputSearch: event.target.value });
    this.props.onSearchChange(event.target.value.toLowerCase());
  };
  
  render() {
    return (
      <section className={classes.searchBar}>
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          value={this.state.inputSearch}
          onChange={this.handleSearch}
          placeholder="Search by name..."
        />
      </section>
    );
  }
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func
};

const mapStateToProps = state => {
  return {
    searchTerm: state.searchTerm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: searchTerm => dispatch(actions.setSearchTerm(searchTerm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
