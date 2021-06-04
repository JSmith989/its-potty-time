import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import Activity from '../views/Activity';
import Calendar from '../views/Calendar';
import { getBabies } from './data/babyData';
import getUid from './data/authData';

export default function Routes({ user }) {
  const [babies, setBabies] = useState([]);

  const getAllBabies = (userId) => {
    getBabies(userId).then((response) => {
      setBabies(response);
    })
      .catch((err) => console.warn('no babies', err));
  };

  useEffect(() => {
    const userId = getUid();
    if (userId) {
      getAllBabies(userId);
    }
  }, [babies]);
  return (
    <Switch>
      <Route exact path='/' component={() => <Home user={user} />} />
      <Route exact path='/calendar/:id' component={(props) => <Calendar user={user} {...props} />} />
      <Route exact path='/:babyId/:activityId' component={(props) => <Activity user={user} {...props} />} />
    </Switch>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
};
