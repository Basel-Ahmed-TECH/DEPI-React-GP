import { useState, useEffect } from 'react';
import { fetchUserProfile } from '../services/githubAPI';

export const useGitHubProfile = (username) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const getProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchUserProfile(username);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [username]);

  return { profile, loading, error };
};