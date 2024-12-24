import axios from 'axios';

const API_URL = 'http://localhost:5000/api/usuarios';

const UserService = {
  getAllUsers: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  createUser: async (user) => {
    const response = await axios.post(API_URL, user);
    return response.data;
  },

  updateUser: async (id, user) => {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

export default UserService;
