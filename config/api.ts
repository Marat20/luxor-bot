import axios from 'axios';

export const $api = axios.create({
  baseURL: process.env.DEFINED_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.DEFINED_API_KEY,
  },
});
