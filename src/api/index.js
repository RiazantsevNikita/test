import axios, { AxiosInstance } from 'axios';

export const API = axios.create({
   // baseURL: 'http://localhost:3000/api/',
   baseURL: 'http://orinice.pp.ua/api/',
   // baseURL: 'http://192.168.0.13:3000/api/',
   headers: {
      "Content-Type": "application/json"
   }
});