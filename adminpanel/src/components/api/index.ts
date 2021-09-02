import axios, { AxiosInstance } from 'axios';

export const API = axios.create({
   baseURL: process.env.VUE_APP_BASE_URL+'api/',
   headers: {
      "Content-Type": "application/json"
   }
});

export const admin_API = axios.create({
   baseURL: process.env.VUE_APP_BASE_URL+'api/admin/',
   headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
   }
});

