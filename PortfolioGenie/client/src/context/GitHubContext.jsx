import React, { createContext, useContext, useState, useCallback } from 'react';
import { useGitHubData } from '../hooks/useGitHubData';

const GitHubContext = createContext();

export const useGitHub = () => {
  const context = useContext(GitHubContext);
  if (!context) {
    throw new Error('useGitHub must be used within GitHubProvider');
  }
  return context;
};

export const GitHubProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);
  
  const { userData, profile, repos, loading, error } = useGitHubData(
    isUsernameSubmitted ? username : ''
  );

  const submitUsername = useCallback((newUsername) => {
    setUsername(newUsername);
    setIsUsernameSubmitted(true);
  }, []);

  const resetGitHub = useCallback(() => {
    setUsername('');
    setIsUsernameSubmitted(false);
  }, []);

  const value = {
    username,
    setUsername: submitUsername,
    userData,
    profile,
    repos,
    loading,
    error,
    isUsernameSubmitted,
    resetGitHub,
  };

  return React.createElement(
    GitHubContext.Provider,
    { value },
    children
  );
};