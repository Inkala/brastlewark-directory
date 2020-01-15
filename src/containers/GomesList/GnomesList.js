import React, { Component } from 'react';

import directoryService from '../../services/directoryService';

class GnomesList extends Component {
  state = {
    gnomes: []
  };

  componentDidMount() {
    directoryService
      .getAllGnomes()
      .then(response => {
        this.setState({ gnomes: response.data.Brastlewark });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { gnomes } = this.state;    
    return (
      <div>
        <h1>Gnomes List</h1>
        {gnomes
          ? gnomes.map(gnome => {
              console.log(gnome.name);
            })
          : null}
      </div>
    );
  }
}

export default GnomesList;
