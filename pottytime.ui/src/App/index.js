/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import firebase from 'firebase/app';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from '../components/MyNav';
import { getUserById } from '../helpers/data/userData';
import './App.scss';
import fbConnection from '../helpers/data/fbConnection';

fbConnection();

class App extends React.Component {
  state = {
    user: null,
    userDetails: {},
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .getIdToken()
          .then((token) => window.sessionStorage.setItem('token', token));

        this.setState({ user });
        getUserById(user.uid).then((response) => {
          this.setState({ userDetails: response });
        });
      } else {
        this.setState({ user: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { user, userDetails } = this.state;
    return (
    <div className='App'>
        <ToastProvider>
      <Router>
        <MyNav user={user} userDetails={userDetails} />
        <Routes user={user} userDetails={userDetails} />
      </Router>
      </ToastProvider>
    </div>
    );
  }
}

export default App;
