// src/core/api/challenges.js
import { axiosInstance } from '../http/axios'

export const getChallenges = () => {
  return axiosInstance.get('/challenges')
}

export const getChallenge = (value) => {
  return axiosInstance.get(`/challenges/${value}`)
}

export const submitChallenge = (challengeId, data) => {
  return axiosInstance.post(`/challenges/${challengeId}/submit`, data)
}

export const getSubmission = (submissionId) => {
  return axiosInstance.get(`/submissions/${submissionId}`)
}

export const getUserSubmissions = (challengeId, params = {}) => {
  return axiosInstance.get(`/challenges/${challengeId}/submissions`, { params })
}