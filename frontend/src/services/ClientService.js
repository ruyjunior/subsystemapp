import axios from 'axios';

const API_URL = 'http://localhost:5000/api/clients';

const ClientService = {
  getAllClients: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  createClient: async (client) => {
    const response = await axios.post(API_URL, client);
    return response.data;
  },

  updateClient: async (id, client) => {
    const response = await axios.put(`${API_URL}/${id}`, client);
    return response.data;
  },

  deleteClient: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

export default ClientService;
