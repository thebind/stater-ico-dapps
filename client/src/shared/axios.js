import axiosBase from 'axios';

const axios = axiosBase.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: `${localStorage.getItem('token')}`
  }
});

export default axios;
