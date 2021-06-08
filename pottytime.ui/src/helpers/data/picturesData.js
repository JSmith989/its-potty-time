import axios from 'axios';
import { baseUrl } from '../config.json';

const picturesUrl = `${baseUrl}/Pictures`;

const getPhotos = () => new Promise((resolve, reject) => {
  axios.get(picturesUrl).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getPhotoById = (photoId) => new Promise((resolve, reject) => {
  axios.get(`${picturesUrl}/${photoId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const addPhoto = (photoObj) => new Promise((resolve, reject) => {
  axios.post(picturesUrl, photoObj).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export {
  getPhotoById, getPhotos, addPhoto,
};
