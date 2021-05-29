/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { baseUrl } from '../config.json';

const usersUrl = `${baseUrl}/Users`;

const getUserById = (userId) => new Promise((resolve, reject) => {
  axios.get(`${usersUrl}/${userId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const updateUser = (userId, updatedUser) => axios.put(`${usersUrl}/${userId}/update`, updatedUser);

const updateDescription = (userId, updatedUser) => axios.put(`${usersUrl}/${userId}/description`, updatedUser);

export { getUserById, updateUser, updateDescription };
