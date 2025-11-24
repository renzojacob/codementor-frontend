// src/core/http/axios.js
import axios from 'axios'
import { setupInterceptors } from './interceptors'

// Create axios instance with base configuration
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://8f7ca0bd-2f2c-4e19-b9a7-dc1905151a70-00-2yqsv7qo87qti.pike.replit.dev:8080',
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