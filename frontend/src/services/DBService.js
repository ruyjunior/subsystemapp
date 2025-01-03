import axios from 'axios';

const DBService = {
  getAll: async (API_URL) => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  create: async (API_URL, data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  update: async (API_URL, id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  delete: async (API_URL, id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

export default DBService;