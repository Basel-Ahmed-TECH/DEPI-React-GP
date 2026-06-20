const API_BASE = "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const generatePortfolioDraft = async ({ profile, repos }) => {
  const response = await fetch(`${API_BASE}/portfolio/generate-draft`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ profile, repos }),
  });

  return parseResponse(response);
};

export const savePortfolio = async ({ title, githubUsername, data }) => {
  const response = await fetch(`${API_BASE}/portfolio`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, githubUsername, data }),
  });

  return parseResponse(response);
};
