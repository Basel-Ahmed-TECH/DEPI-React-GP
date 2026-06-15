// Cleans and structures the raw GitHub data

// Extract skills from all repositories
export const extractSkills = (repos) => {
  const languages = new Set();
  
  repos.forEach(repo => {
    if (repo.language) {
      languages.add(repo.language);
    }
  });
  
  return Array.from(languages);
};

// Format repository data for portfolio
export const formatRepoData = (repo) => {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description || 'No description available',
    url: repo.html_url,
    homepage: repo.homepage,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language || 'Not specified',
    topics: repo.topics || [],
    created_at: repo.created_at,
    updated_at: repo.updated_at,
  };
};

// Process all repositories
export const processRepos = (repos) => {
  if (!repos || repos.length === 0) return [];
  
  return repos
    .filter(repo => !repo.fork) // Optional: filter out forked repos
    .map(formatRepoData)
    .sort((a, b) => b.stars - a.stars); // Sort by stars
};

// Extract user summary data
export const extractUserSummary = (profile, repos) => {
  return {
    name: profile.name || profile.login,
    username: profile.login,
    avatar: profile.avatar_url,
    bio: profile.bio || 'No bio available',
    location: profile.location || 'Not specified',
    company: profile.company || '',
    blog: profile.blog || '',
    followers: profile.followers,
    following: profile.following,
    publicRepos: profile.public_repos,
    totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    skills: extractSkills(repos),
    joinDate: profile.created_at,
  };
};