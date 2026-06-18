// Combined Hook

import { useState, useEffect, useMemo } from 'react';
import { useGitHubProfile } from './useGitHubProfile';
import { useGitHubRepos } from './useGitHubRepos';
import { extractUserSummary } from '../utils/dataProcessor';

export const useGitHubData = (username) => {
  const { profile, loading: profileLoading, error: profileError } = useGitHubProfile(username);
  const { repos, loading: reposLoading, error: reposError } = useGitHubRepos(username);

  const userData = useMemo(() => {
    if (!profile || !repos) return null;
    return extractUserSummary(profile, repos);
  }, [profile, repos]);

  return {
    userData,
    profile,
    repos,
    loading: profileLoading || reposLoading,
    error: profileError || reposError,
  };
};