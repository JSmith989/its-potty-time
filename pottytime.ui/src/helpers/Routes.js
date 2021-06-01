import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import Calendar from '../views/Calendar';

export default function Routes({ user }) {
  return (
    <Switch>
      <Route exact path='/' component={() => <Home user={user} />} />
      <Route exact path='/calendar/:id' component={(props) => <Calendar user={user} {...props} />} />
    </Switch>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
};
