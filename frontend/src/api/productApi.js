import axios from "axios";

const API_BASE = "http://localhost:5000/api/products";
// const API_BASE = "https://inventory-backend-x3eb.onrender.com/api/products";


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

    return axios.post(`${API_BASE}/import`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  exportCSV: () => axios.get(`${API_BASE}/export`, { responseType: "blob" })
};
