import axios from 'axios';

export const request = axios.create({
  baseURL: process.env.REACT_API_URL,
  headers: {
    Authorization: localStorage.getItem('apiKey'),
  },
});
