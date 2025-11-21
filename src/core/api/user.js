// src/core/api/user.js (or auth.js as per your structure)
import { axiosInstance } from '../http/axios'

/**
 * Fetches the currently authenticated user's profile data.
 * The token/JWT should be handled by your axios interceptor.
 * @returns {Promise<Object>} The user profile data.
 */
export const fetchProfileData = async () => {
  const response = await axiosInstance.get('/profile') // Maps to your $router->get('profile', ...)
  return response.data
}