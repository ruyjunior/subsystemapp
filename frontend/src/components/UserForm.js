import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import '../pages/styles/Usuarios.css'; 


const UserForm = ({ userToEdit, onSave }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    name: '',
    level: '',
    password: '',
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData(userToEdit);
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if ((userToEdit || currentUser.level !== 'admin')) {
        await UserService.updateUser(userToEdit.id, formData);
      } else {
        await UserService.createUser(formData);
      }
      onSave();
      setFormData({ username: '', name: '', level: '', password: '' });
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{userToEdit || currentUser.level !== 'admin'  ? 'Editar Usuário' : 'Criar Usuário'}</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <select className='selectLevel'
        type="text"
        name="level"
        placeholder="Nível"
        value={formData.level}
        onChange={handleChange}
        required
      >
        <option value={'admin'}>Adminastrador</option>
        <option value={'oper'}>Operador</option>
        </select>
      
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  
  )
};

export default UserForm;
