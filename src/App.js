import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GnomesList from './containers/GomesList/GnomesList';
import GnomeDetails from './components/GnomeDetails/GnomeDetails';
import NotFound from './components/NotFound/NotFound';
import classes from './App.module.scss';
import NavBar from './containers/NavBar/NavBar';

function App() {
  return (
    <div className={classes.App}>
      <NavBar />
      <Switch>
        <Route path="/gnome" exact component={GnomeDetails} />
        <Route path="/" exact component={GnomesList} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
