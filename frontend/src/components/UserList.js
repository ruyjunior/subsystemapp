import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';

const UserList = ({ onEdit, onDelet}) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await UserService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await UserService.deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {currentUser.level === 'admin' ? ( 
      <>
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.username}) - Nível: {user.level}
            <button onClick={() => onEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      </>
      ) : (
        <>
        <button onClick={() => onEdit(currentUser)}>Editar</button>
        </>
      )}
    </div>
  );
};

export default UserList;