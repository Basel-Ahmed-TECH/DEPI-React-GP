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
  if (!response.ok) throw new Error(data.message || "Request failed");
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

export async function getUserPortfolios() {
  const res = await fetch(`${API_BASE}/portfolio`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch portfolios');
  return Array.isArray(data) ? data : data.portfolios ?? [];
}

export async function deletePortfolio(id) {
  const res = await fetch(`${API_BASE}/portfolio/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete portfolio');
  return data;
}

export async function updatePortfolio(id, { title, data }) {
  const res = await fetch(`${API_BASE}/portfolio/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, data }),
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.message || 'Failed to update portfolio');
  return resData;
}