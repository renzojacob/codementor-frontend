// src/core/http/axios.js
import axios from 'axios'
import { setupInterceptors } from './interceptors'

// Create axios instance with base configuration
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://codementor-backend-izws.onrender.com',
  //withCredentials: true, // ← critical for cookies
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Setup interceptors
setupInterceptors(axiosInstance)

// Default headers configuration
export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const removeAuthHeader = () => {
  delete axiosInstance.defaults.headers.common['Authorization']
}

// Initialize auth header if token exists