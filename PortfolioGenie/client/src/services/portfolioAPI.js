import axios from 'axios';

const API_BASE = "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleAxiosError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  }
  throw new Error(error.message || "Request failed");
};

export const generatePortfolioDraft = async ({ profile, repos }) => {
  try {
    const response = await axios.post(`${API_BASE}/portfolio/generate-draft`, { profile, repos }, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const savePortfolio = async ({ title, githubUsername, data }) => {
  try {
    const response = await axios.post(`${API_BASE}/portfolio`, { title, githubUsername, data }, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export async function getUserPortfolios() {
  try {
    const response = await axios.get(`${API_BASE}/portfolio`, {
      headers: getAuthHeaders(),
    });
    const data = response.data;
    return Array.isArray(data) ? data : data.portfolios ?? [];
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function deletePortfolio(id) {
  try {
    const response = await axios.delete(`${API_BASE}/portfolio/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function updatePortfolio(id, { title, data }) {
  try {
    const response = await axios.put(`${API_BASE}/portfolio/${id}`, { title, data }, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}