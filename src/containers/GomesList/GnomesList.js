import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';

class GnomesList extends Component {
  componentDidMount() {
    this.props.onGetGnomes();
  }

  render() {
    const { gnomes } = this.props;
    console.log('Gnomes:', gnomes);
    return (
      <div>
        <h1>Gnomes List</h1>
        {gnomes.length
          ? gnomes.map(gnome => (
              <img key={gnome.id} src={gnome.thumbnail} alt={`${gnome.name} profile`} />
            ))
          : <p>Loading</p>}
      </div>
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
