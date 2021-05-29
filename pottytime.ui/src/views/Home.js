/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import { getBabies } from '../helpers/data/babyData';
import Auth from '../components/Auth';
import Profile from '../components/Profile';
import BabyCard from '../components/Cards/BabyCard';
import getUid from '../helpers/data/authData';

export default function Home({ user }) {
  const [babies, setBabies] = useState([]);

  const getAllBabies = (userId) => {
    getBabies(userId).then((response) => {
      setBabies(response);
    })
      .catch((err) => console.warn('no babies', err));
  };
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
      component = <div className="logout"><button className='cool-button' onClick={(e) => logMeOut(e)}>Log Out</button></div>;
    }
    return component;
  };

  useEffect(() => {
    const userId = getUid();
    if (userId) {
      getAllBabies(userId);
    }
  }, [babies]);

  const showBabies = () => (
    babies.map((baby) => <BabyCard key={baby.id} baby={baby} />)
  );
  return (
    <>{user ? (
        <div>
            {loadLogout()}
            <div className="yourProfile">
            <Profile />
            </div>
            <div className="yourBabies">
            {showBabies()}
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
