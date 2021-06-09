import axios from 'axios';
import { baseUrl } from '../config.json';

const picturesUrl = `${baseUrl}/Photos`;

const getPhotos = () => new Promise((resolve, reject) => {
  axios.get(picturesUrl).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getPhotoByBabyId = (babyId) => new Promise((resolve, reject) => {
  axios.get(`${picturesUrl}/${babyId}/photos`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const addPhoto = (photoObj) => new Promise((resolve, reject) => {
  axios.post(picturesUrl, photoObj).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export {
  getPhotoByBabyId, getPhotos, addPhoto,
};
