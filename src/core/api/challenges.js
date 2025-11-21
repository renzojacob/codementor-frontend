// src/core/api/challenges.js
import {axiosInstance} from '../http/axios'

export const getChallenges = () => {
  return axiosInstance.get('/challenges')
}

export const getChallenge = (value) => {
  return axiosInstance.get(`/challenges/${value}`)
}
