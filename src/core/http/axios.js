import axios from 'axios'
import { setupInterceptors } from './interceptors'

// Create axios instance with proper CORS configuration
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Important CORS settings
  withCredentials: false, // Set to false for most JWT APIs
  timeout: 10000, // 10 second timeout
})

// Setup interceptors
setupInterceptors(axiosInstance)