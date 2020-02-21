import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GnomesList from './pages/GomesList/GnomesList';
import GnomeDetails from './pages/GnomeDetails/GnomeDetails';
import NotFound from './components/NotFound/NotFound';
import classes from './App.module.scss';
import NavBar from './components/NavBar/NavBar';

const App = () => {
  return (
    <div className={classes.App}>
      <NavBar />
      <Switch>
        <Route path="/gnomes/:id" exact component={GnomeDetails} />
        <Route path="/" exact component={GnomesList} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
