/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import Auth from '../components/Auth';
import Profile from '../components/Profile';

export default function Home({ user }) {
  const history = useHistory();
  const logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    history.push('/');
    window.location.reload();
  };
  const loadComponent = () => {
    let component = '';
    if (!user) {
      component = <Auth />;
    }
    return component;
  };

  const loadLogout = () => {
    let component = '';
    if (user) {
      component = <div className="logout"><button className='logout-button' onClick={(e) => logMeOut(e)}>Log Out</button></div>;
    }
    return component;
  };

  return (
    <>{user ? (
        <div>
            {loadLogout()}
            <div className="yourProfile">
            <Profile />
            </div>
        </div>
    ) : (
        <div className='login'>
            {loadComponent()}
        </div>
    )}
    </>
  );
}

Home.propTypes = {
  user: PropTypes.any
};
