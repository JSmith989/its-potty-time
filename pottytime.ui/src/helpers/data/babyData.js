import axios from 'axios';
import { baseUrl } from '../config.json';

const babiesUrl = `${baseUrl}/Babies`;

const getBabies = (userId) => new Promise((resolve, reject) => {
  axios.get(`${babiesUrl}/${userId}/yours`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getBabyById = (babyId) => new Promise((resolve, reject) => {
  axios.get(`${babiesUrl}/${babyId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const addBaby = (babyObject) => new Promise((resolve, reject) => {
  axios.post(babiesUrl, babyObject).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export { getBabyById, getBabies, addBaby };
