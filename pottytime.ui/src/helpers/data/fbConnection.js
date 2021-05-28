import axios from 'axios';
import firebase from 'firebase';
import config from '../config.json';

axios.interceptors.request.use(
  (request) => {
    const token = window.sessionStorage.getItem('token');

    if (token != null) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (err) => Promise.reject(err),
);

const firebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
};

export default firebaseApp;
