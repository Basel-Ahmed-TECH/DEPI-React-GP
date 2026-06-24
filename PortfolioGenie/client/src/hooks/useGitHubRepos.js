// src/hooks/useGitHubRepos.js
import { useState, useEffect } from 'react';
import { fetchUserRepos } from '../services/githubAPI';
import { processRepos } from '../utils/dataProcessor';

export const useGitHubRepos = (username) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const getRepos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchUserRepos(username);
        const processed = processRepos(data);
        setRepos(processed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getRepos();
  }, [username]);

  return { repos, loading, error };
};