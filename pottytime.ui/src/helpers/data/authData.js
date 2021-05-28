/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app';
import 'firebase/auth';

const getUid = () => firebase.auth().currentUser?.uid;

export default getUid;
