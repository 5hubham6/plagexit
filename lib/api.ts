// frontend/lib/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
});

export const uploadAnswerKey = async (formData) => {
  return API.post('/api/professor-answer', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};