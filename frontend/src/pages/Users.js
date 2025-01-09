import React, { useState, useEffect } from 'react';

import axios from 'axios';
import '../styles/Main.css';
import UserForm from '../components/forms/UserForm';
import DBService from '../services/DBService';


const API_URL = 'http://localhost:5000/api/users';

function Users(user) {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [error, setError] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('user'));


  
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data);
    } catch (err) {
      setError('Erro ao carregar os usuários.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await DBService.delete(API_URL, id);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  const handleSave = () => {
    setUserToEdit(null);
    fetchUsers();
  };
    
  return (
    <div className="page">
      <h1>USUÁRIOS</h1>
      {currentUser.level === 'admin' ? (  <>
      <UserForm userToEdit={userToEdit} onSave={handleSave} />
      </>) : (
        <span>Sem previlégios!</span>
      )}

      <h1>Controle de Usuários</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            {/*<th>ID</th>*/}
            <th>Login</th>
            <th>Nome Completo</th>
            <th>CPF</th>
            <th>Nível</th>
            <th>Controle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/*<td>{user.id}</td>*/}
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.cpf}</td>
              <td>{user.level}</td>
              <td>
                {currentUser.level === 'admin' || currentUser.id === user.id ? (  <>
                <button onClick={() => handleEdit(user)} >Editar</button>
                </>) : (
                  <span></span>
                )}
                {currentUser.level === 'admin' && currentUser.id !== user.id ? (  <>
                <button onClick={() => handleDelete(user.id)}>Excluir</button>
                </>) : (
                  <span></span>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
