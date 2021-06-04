import axios from 'axios';
import { baseUrl } from '../config.json';

const activitiesUrl = `${baseUrl}/Activities`;

const babyPooped = (babyId) => axios.post(`${activitiesUrl}/poop`, babyId);

const getBabyActivities = (babyId) => new Promise((resolve, reject) => {
  axios.get(`${activitiesUrl}/${babyId}/all`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const addActivity = (activityObject) => new Promise((resolve, reject) => {
  axios.post(activitiesUrl, activityObject).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export { babyPooped, getBabyActivities, addActivity };
