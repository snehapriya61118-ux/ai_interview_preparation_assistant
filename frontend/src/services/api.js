import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to requests if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const getMe = () => api.get('/auth/me');

// Resume APIs
export const uploadResume = (formData) => api.post('/resume/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getLatestResume = () => api.get('/resume');
export const analyzeResume = () => api.post('/resume/analyze');

// Job Description APIs
export const analyzeJobDescription = (data) => api.post('/job-description/analyze', data);
export const getLatestJobDescription = () => api.get('/job-description');

// Interview APIs
export const createInterview = (data) => api.post('/interview/create', data);
export const generateQuestions = (data) => api.post('/interview/generate-questions', data);
export const evaluateAnswer = (data) => api.post('/interview/evaluate-answer', data);
export const generateFollowUp = (data) => api.post('/interview/follow-up', data);
export const completeInterview = (interviewId, overallScore, answersEval) => 
  api.post(`/interview/complete?interview_id=${interviewId}&overall_score=${overallScore}`, answersEval || []);
export const getInterviewHistory = () => api.get('/interview/history');
export const getInterviewReport = (id) => api.get(`/interview/${id}/report`);

// Preparation Plan APIs
export const getPreparationPlan = () => api.get('/preparation-plan');
export const togglePreparationTopic = (data) => api.post('/preparation-plan/toggle', data);

// Dashboard Stats API
export const getDashboardStats = () => api.get('/dashboard/stats');

export default api;
