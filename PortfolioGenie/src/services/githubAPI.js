// src/services/githubAPI.js
import { GITHUB_API_BASE } from '../utils/constants';

// Helper to check rate limits
export const checkRateLimit = async () => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/rate_limit`);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

// Fetch user profile
export const fetchUserProfile = async (username) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
    
    // Handle rate limiting
    if (response.status === 403) {
      const rateLimit = response.headers.get('X-RateLimit-Reset');
      const resetTime = new Date(rateLimit * 1000);
      throw new Error(`Rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}`);
    }
    
    if (response.status === 404) throw new Error('User not found');
    if (!response.ok) throw new Error('Failed to fetch user profile');
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Fetch user repositories (single request, no pagination)
export const fetchUserRepos = async (username) => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`
    );
    
    if (response.status === 403) {
      const rateLimit = response.headers.get('X-RateLimit-Reset');
      const resetTime = new Date(rateLimit * 1000);
      throw new Error(`Rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}`);
    }
    
    if (!response.ok) throw new Error('Failed to fetch repositories');
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Fetch languages for a specific repo
export const fetchRepoLanguages = async (username, repoName) => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${repoName}/languages`
    );
    if (!response.ok) return {};
    return await response.json();
  } catch (error) {
    return {};
  }
};