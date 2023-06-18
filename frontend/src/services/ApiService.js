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

export const getAllArticles = async () => {
  try {
    const response = await apiClient.get('/v1/getAllArticles');
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch articles: ${error}`);
    throw error;
  }
}

export const getReviewers = async () => {
  try {
    const response = await apiClient.get('/v1/reviewers');
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch reviewers: ${error}`);
    throw error;
  }
}

export const assignReviewer = async (payload) => {
  try {
    const response = await apiClient.post(`/v1/article/assignReviewers`, payload);
    return response.data;
  } catch (error) {
    console.error(`Failed to assign reviewer: ${error}`);
    throw error;
  }
}

// router.get('/user/:walletAddress', getUser);

export const getUserByWalletAddress = async (walletAddress) => {
  try {
    const response = await apiClient.get(`/v1/user/${walletAddress}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user: ${error}`);
    throw error;
  }
}