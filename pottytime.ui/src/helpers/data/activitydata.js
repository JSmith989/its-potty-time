import axios from 'axios';
import { baseUrl } from '../config.json';

const activitiesUrl = `${baseUrl}/Activities`;

const babyPooped = (babyId) => axios.post(`${activitiesUrl}/poop`, babyId);

// eslint-disable-next-line import/prefer-default-export
export { babyPooped };
