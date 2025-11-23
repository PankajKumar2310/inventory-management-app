import axios from "axios";

const API_BASE = "http://localhost:5000/api/products";

export const api = {
  getProducts: (params) => axios.get(API_BASE, { params }),
  searchProducts: (name) => axios.get(`${API_BASE}/search`, { params: { name } }),
  createProduct: (data) => axios.post(API_BASE, data),
  updateProduct: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteProduct: (id) => axios.delete(`${API_BASE}/${id}`),
  getHistory: (id) => axios.get(`${API_BASE}/${id}/history`),
  importCSV: (file) => {
    const formData = new FormData();
    formData.append("csvFile", file);
    return axios.post(`${API_BASE}/import`, formData);
  },
  exportCSV: () => axios.get(`${API_BASE}/export`, { responseType: "blob" })
};
