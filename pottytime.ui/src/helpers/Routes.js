import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';

export default function Routes({ user }) {
  return (
    <Switch>
      <Route exact path='/' component={() => <Home user={user} />} />
    </Switch>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
};
