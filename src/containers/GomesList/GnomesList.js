import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';
import classes from './GnomesList.module.scss';

class GnomesList extends Component {
  componentDidMount() {
    this.props.onGetGnomes();
  }

  render() {
    const { gnomes } = this.props;
    const spinner = <div className={classes.loading}><img src="/img/loading.gif" alt="loading" /></div>
    console.log('Gnomes:', gnomes);
    return (
      <main>
        <h1>Gnomes List</h1>
        {(gnomes && gnomes.length)
          ? gnomes.map(gnome => (
              <img key={gnome.id} src={gnome.thumbnail} alt={`${gnome.name} profile`} />
            ))
          : spinner}
      </main>
    );
  }
}

const mapStateToProps = state => {
  // console.log('STATE:', state);
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
