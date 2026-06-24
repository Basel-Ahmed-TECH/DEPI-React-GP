const pool = require('../config/db');

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
const GEMINI_API_VERSION = process.env.GEMINI_API_VERSION || 'v1beta';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/${GEMINI_API_VERSION}/models/${GEMINI_MODEL}:generateContent`;

const portfolioSchema = {
  type: 'OBJECT',
  properties: {
    suggestedTitle: { type: 'STRING' },
    aboutMe: { type: 'STRING' },
    services: {
      type: 'ARRAY',
      items: { type: 'STRING' },
    },
    skills: {
      type: 'ARRAY',
      items: { type: 'STRING' },
    },
    projects: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING' },
          description: { type: 'STRING' },
          technologies: {
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
          repoUrl: { type: 'STRING' },
          liveUrl: { type: 'STRING' },
        },
        required: ['name', 'description', 'technologies', 'repoUrl'],
      },
    },
  },
  required: ['suggestedTitle', 'aboutMe', 'services', 'skills', 'projects'],
};

const clampText = (value, maxLength = 600) => {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
};

const uniqueStrings = (items, limit = 20, maxLength = 60) => {
  if (!Array.isArray(items)) return [];
  const seen = new Set();

  return items
    .map((item) => clampText(item, maxLength))
    .filter(Boolean)
    .filter((item) => {
      const key = item.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
};

const normalizeRepo = (repo = {}) => ({
  name: clampText(repo.name, 120),
  description: clampText(repo.description === 'No description available' ? '' : repo.description, 300),
  html_url: clampText(repo.html_url || repo.url, 300),
  homepage: clampText(repo.homepage, 300),
  language: clampText(repo.language === 'Not specified' ? '' : repo.language, 80),
  topics: uniqueStrings(repo.topics, 10),
  stargazers_count: Number(repo.stargazers_count || repo.stars || 0),
  forks_count: Number(repo.forks_count || repo.forks || 0),
  updated_at: clampText(repo.updated_at, 40),
});

const normalizeProfile = (profile = {}) => ({
  login: clampText(profile.login, 80),
  name: clampText(profile.name, 120),
  bio: clampText(profile.bio, 300),
  company: clampText(profile.company, 120),
  blog: clampText(profile.blog, 200),
  location: clampText(profile.location, 120),
  html_url: clampText(profile.html_url, 300),
  public_repos: Number(profile.public_repos || 0),
  followers: Number(profile.followers || 0),
});

const fallbackAIData = (profile, repos) => {
  const languages = uniqueStrings(repos.map((repo) => repo.language).filter(Boolean), 14);
  const topics = uniqueStrings(repos.flatMap((repo) => repo.topics || []), 20);
  const skills = uniqueStrings([...languages, ...topics], 24);
  const displayName = profile.name || profile.login || 'Developer';
  const selectedRepos = repos.slice(0, 4);

  return {
    suggestedTitle: languages.length ? `${languages[0]} Developer` : 'Software Developer',
    aboutMe: profile.bio
      ? `${profile.bio} I build practical software projects and enjoy turning ideas into reliable, user-friendly products.`
      : `${displayName} is a software developer focused on building clean, reliable, and useful digital products.`,
    services: [
      'Web application development',
      'Frontend implementation',
      'API integration',
      'Portfolio and project presentation',
    ],
    skills,
    projects: selectedRepos.map((repo) => ({
      name: repo.name,
      description: repo.description || `A ${repo.language || 'software'} project built to solve real user needs with maintainable code.`,
      technologies: uniqueStrings([repo.language, ...(repo.topics || [])].filter(Boolean), 8),
      repoUrl: repo.html_url,
      liveUrl: repo.homepage || '',
    })),
  };
};

const normalizeAIData = (data, profile, repos) => {
  const fallback = fallbackAIData(profile, repos);
  const repoByName = new Map(repos.map((repo) => [repo.name.toLowerCase(), repo]));

  const projects = Array.isArray(data.projects) ? data.projects : [];

  return {
    suggestedTitle: clampText(data.suggestedTitle, 120) || fallback.suggestedTitle,
    aboutMe: clampText(data.aboutMe, 800) || fallback.aboutMe,
    services: uniqueStrings(data.services, 8, 90).length ? uniqueStrings(data.services, 8, 90) : fallback.services,
    skills: uniqueStrings(data.skills, 30, 60).length ? uniqueStrings(data.skills, 30, 60) : fallback.skills,
    projects: projects.slice(0, 6).map((project) => {
      const name = clampText(project.name, 120);
      const matchingRepo = repoByName.get(name.toLowerCase());

      return {
        name: name || matchingRepo?.name || 'Project',
        description: clampText(project.description, 700) || matchingRepo?.description || 'A software project built with care and attention to practical use.',
        technologies: uniqueStrings(project.technologies, 10, 60),
        repoUrl: clampText(project.repoUrl, 300) || matchingRepo?.html_url || '',
        liveUrl: clampText(project.liveUrl, 300) || matchingRepo?.homepage || '',
      };
    }).filter((project) => project.name && project.repoUrl),
  };
};

const buildPrompt = ({ email, profile, repos }) => {
  const payload = {
    userEmail: email,
    githubProfile: profile,
    repositories: repos,
  };

  return [
    'Create portfolio form content for a developer after they submit their GitHub profile.',
    'Use the GitHub profile and repositories as the source of truth.',
    'Write concise professional copy in first person for aboutMe.',
    'Choose the strongest projects from the repositories.',
    'Infer practical services and skills from languages, topics, project names, and descriptions.',
    'Do not invent degrees, employers, phone numbers, or private contact details.',
    'Return only data that fits the response schema.',
    JSON.stringify(payload),
  ].join('\n\n');
};

async function callGemini({ email, profile, repos }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return fallbackAIData(profile, repos);
  }

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: buildPrompt({ email, profile, repos }) }],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: 'application/json',
        responseSchema: portfolioSchema,
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Gemini API Error:', detail);
    return fallbackAIData(profile, repos);
  }

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return fallbackAIData(profile, repos);

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini Parse Error:', error.message);
    return fallbackAIData(profile, repos);
  }
}

async function ensurePortfolioTable() {
  // Create table if it doesn't exist at all
  await pool.query(`
    CREATE TABLE IF NOT EXISTS portfolios (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title TEXT NOT NULL DEFAULT 'Untitled Portfolio',
      name TEXT NOT NULL DEFAULT 'Untitled Portfolio',
      github_username TEXT,
      data JSONB NOT NULL DEFAULT '{}',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  // Only add columns that are genuinely optional (safe to add after the fact)
  await pool.query(`ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS github_username TEXT`);
  await pool.query(`ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS name TEXT`);

  // Backfill any nulls from before the NOT NULL defaults were in place
  await pool.query(`
    UPDATE portfolios
    SET
      name  = COALESCE(name,  title, 'Untitled Portfolio'),
      title = COALESCE(title, name,  'Untitled Portfolio'),
      data  = COALESCE(data,  '{}'::jsonb)
    WHERE name IS NULL OR title IS NULL OR data IS NULL
  `);
}

exports.generatePortfolioDraft = async (req, res) => {
  const profile = normalizeProfile(req.body.profile);
  const repos = Array.isArray(req.body.repos)
    ? req.body.repos.map(normalizeRepo).filter((repo) => repo.name && repo.html_url).slice(0, 20)
    : [];

  if (!profile.login) {
    return res.status(400).json({ message: 'GitHub profile is required.' });
  }

  try {
    const aiData = await callGemini({
      email: req.user.email,
      profile,
      repos,
    });

    const normalized = normalizeAIData(aiData, profile, repos);

    return res.status(200).json({
      email: req.user.email,
      ai: normalized,
    });
  } catch (error) {
    console.error('Portfolio Generation Error:', error.message);
    return res.status(500).json({ message: 'Unable to generate portfolio content.' });
  }
};

exports.savePortfolio = async (req, res) => {
  const { title, githubUsername, data } = req.body;

  if (!data || typeof data !== 'object') {
    return res.status(400).json({ message: 'Portfolio data is required.' });
  }

  try {
    await ensurePortfolioTable();

    const portfolioTitle = clampText(title, 140) || `${req.user.email}'s Portfolio`;
    const result = await pool.query(
      `INSERT INTO portfolios (user_id, name, title, github_username, data)
       VALUES ($1, $2, $3, $4, $5::jsonb)
       RETURNING id, name, title, github_username, data, created_at, updated_at`,
      [req.user.id, portfolioTitle, portfolioTitle, clampText(githubUsername, 80), JSON.stringify(data)]
    );

    return res.status(201).json({
      message: 'Portfolio saved successfully.',
      portfolio: result.rows[0],
    });
  } catch (error) {
    console.error('Portfolio Save Error:', error.message);
    return res.status(500).json({ message: 'Unable to save portfolio.' });
  }
};

exports.getUserPortfolios = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, title, github_username, created_at, updated_at
       FROM portfolios
       WHERE user_id = $1
       ORDER BY updated_at DESC`,
      [req.user.id]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Get Portfolios Error:', error.message);
    return res.status(500).json({ message: 'Unable to fetch portfolios.' });
  }
};

exports.deletePortfolio = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM portfolios WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Portfolio not found or not yours.' });
    }
    return res.status(200).json({ message: 'Portfolio deleted successfully.' });
  } catch (error) {
    console.error('Delete Portfolio Error:', error.message);
    return res.status(500).json({ message: 'Unable to delete portfolio.' });
  }
};

// GET /portfolio/:id  — fetch one portfolio (owner only)
exports.getPortfolioById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT id, name, title, github_username, data, created_at, updated_at
       FROM portfolios WHERE id = $1 AND user_id = $2`,
      [id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Portfolio not found.' });
    }
    return res.status(200).json({ portfolio: result.rows[0] });
  } catch (error) {
    console.error('GetPortfolioById Error:', error.message, error.stack);
    return res.status(500).json({ message: 'Unable to fetch portfolio.' });
  }
};

// PUT /portfolio/:id  — update a portfolio's data (owner only)
exports.updatePortfolioById = async (req, res) => {
  const { id } = req.params;
  const { title, data } = req.body;
  if (!data || typeof data !== 'object') {
    return res.status(400).json({ message: 'Portfolio data is required.' });
  }
  try {
    const portfolioTitle = clampText(title, 140) || `${req.user.email}'s Portfolio`;
    const result = await pool.query(
      `UPDATE portfolios
         SET title = $1, name = $2, data = $3::jsonb, updated_at = NOW()
       WHERE id = $4 AND user_id = $5
       RETURNING id, name, title, github_username, data, created_at, updated_at`,
      [portfolioTitle, portfolioTitle, JSON.stringify(data), id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Portfolio not found.' });
    }
    return res.status(200).json({ message: 'Portfolio updated.', portfolio: result.rows[0] });
  } catch (error) {
    console.error('UpdatePortfolio Error:', error.message, error.stack);
    return res.status(500).json({ message: 'Unable to update portfolio.' });
  }
};