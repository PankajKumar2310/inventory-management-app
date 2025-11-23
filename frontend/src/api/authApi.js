import axios from "axios";

const AUTH_BASE = "https://inventory-backend-x3eb.onrender.com/api/auth";
// const AUTH_BASE = "http://localhost:5000/api/auth";

export const authApi = {
  register: (data) => axios.post(`${AUTH_BASE}/register`, data),
  login: (data) => axios.post(`${AUTH_BASE}/login`, data),
};
