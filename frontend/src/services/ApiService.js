// src/services/ApiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getUser = async (address) => {
  try {
    const response = await apiClient.get(`/v1/user/${address}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user: ${error}`);
    throw error;
  }
};

export const registerUser = async (user) => {
  try {
    const response = await apiClient.post('/v1/user', user);
    return response.data;
  } catch (error) {
    console.error(`Failed to register user: ${error}`);
    throw error;
  }
};

export const submitPaper = async (paperFormData) => {
  try {
    const response = await apiClient.post('/v1/article', paperFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to submit paper: ${error}`);
    throw error;
  }
};

export const getPapers = async () => {
    try {
        const response = await apiClient.get('/papers');
        return response.data;
      } catch (error) {
        console.error(`Failed to fetch papers: ${error}`);
        throw error;
      }
};

