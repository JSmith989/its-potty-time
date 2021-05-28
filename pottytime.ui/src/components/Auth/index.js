/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import { baseUrl } from '../../helpers/config.json';
import 'firebase/auth';

const usersUrl = `${baseUrl}/Users`;

export default class Auth extends Component {
    loginClickEvent = (e) => {
      e.preventDefault();
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((cred) => {
        const user = cred.additionalUserInfo.profile;
        if (cred.additionalUserInfo.isNewUser) {
          const userInfo = {
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email,
            imageUrl: user.picture,
            description: '',
            firebaseId: cred.user.uid,
          };
          axios.post(usersUrl, userInfo);
        }
      });
    };

    render() {
      return (
      <div className="Auth d-flex justify-content-center">
        <button className="login-button" onClick={this.loginClickEvent}>
          Sign In
        </button>
      </div>
      );
    }
}
