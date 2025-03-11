// src/api.js
import axios from 'axios';

// Set your base URL for API calls. Since your backend is running on localhost:3001:
const apiBaseUrl = 'http://localhost:3001/api';

// Professor API: Upload Answer Key
export const uploadAnswerKey = async (assignmentData, pdfData) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/professor/upload-answer-key`, {
      ...assignmentData,
      pdfData  // pdfData should be a Base64-encoded string representing your PDF file
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading answer key:', error);
    throw error;
  }
};

// Student API: Submit Assignment
export const submitAssignment = async (studentId, assignmentId, pdfData) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/student/submit-assignment`, {
      studentId,
      assignmentId,
      pdfData
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting assignment:', error);
    throw error;
  }
};

// Get all student submissions
export const getSubmissions = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/student/submissions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};

// Detect plagiarism among submissions
export const detectPlagiarism = async (submissionIds) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/student/detect-plagiarism`, { submissionIds });
    return response.data;
  } catch (error) {
    console.error('Error detecting plagiarism:', error);
    throw error;
  }
};
