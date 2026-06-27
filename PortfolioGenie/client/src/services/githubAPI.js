// src/services/githubAPI.js
import axios from 'axios';
import { GITHUB_API_BASE } from '../utils/constants';

// Helper to check rate limits
export const checkRateLimit = async () => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/rate_limit`);
    return response.data;
  } catch (error) {
    return null;
  }
};

// Fetch user profile
export const fetchUserProfile = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        const rateLimit = error.response.headers['x-ratelimit-reset'];
        const resetTime = new Date(rateLimit * 1000);
        throw new Error(`Rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}`);
      }
      if (error.response.status === 404) throw new Error('User not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
  }
};

// Fetch user repositories (single request, no pagination)
export const fetchUserRepos = async (username) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const rateLimit = error.response.headers['x-ratelimit-reset'];
      const resetTime = new Date(rateLimit * 1000);
      throw new Error(`Rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}`);
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch repositories');
  }
};

// Fetch languages for a specific repo
export const fetchRepoLanguages = async (username, repoName) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE}/repos/${username}/${repoName}/languages`
    );
    return response.data;
  } catch (error) {
    return {};
  }
};