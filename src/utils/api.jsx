// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // Your backend URL
  withCredentials: true, // If using cookies for auth
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
