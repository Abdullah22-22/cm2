import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function registerUser(payload) {
  const res = await api.post("/users/register", payload);
  return res.data;
}

export async function loginUser(payload) {
  const res = await api.post("/users/login", payload);
  return res.data;
}

export async function getJobs() {
  const res = await api.get("/jobs");
  return res.data;
}

export async function createJob(payload) {
  const res = await api.post("/jobs", payload);
  return res.data;
}