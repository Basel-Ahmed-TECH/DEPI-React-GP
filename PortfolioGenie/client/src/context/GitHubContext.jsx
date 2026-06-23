import React, { createContext, useContext, useState, useCallback } from 'react';
import { useGitHubData } from '../hooks/useGitHubData';

const GitHubContext = createContext();

// Retrieves the current context value & Returns all the state and functions stored in the context
export const useGitHub = () => {
const context = useContext(GitHubContext);
if (!context) {
throw new Error('useGitHub must be used within GitHubProvider');
}
return context;
};

export const GitHubProvider = ({ children }) => {
const [username, setUsername] = useState('');
// State to track if the username has been submitted (prevents unnecessary API calls on initial render)
const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);

// Fetches GitHub data only when a username has been submitted
const { userData, profile, repos, loading, error } = useGitHubData(
isUsernameSubmitted ? username : ''
);

// Handles username submission and sets the submitted state to true
const submitUsername = useCallback((newUsername) => {
setUsername(newUsername);
setIsUsernameSubmitted(true);
}, []);

// Resets the GitHub context to its initial state
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