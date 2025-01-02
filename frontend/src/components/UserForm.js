import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import '../pages/styles/Users.css'; 


const UserForm = ({ userToEdit, onSave }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    name: '',
    level: '',
    password: '',
    cpf: ''
  });
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    if (userToEdit) {
      setFormData(userToEdit);
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCPFChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (value.length > 3) value = value.replace(/(\d{3})(\d)/, "$1.$2");
    if (value.length > 6) value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (value.length > 9) value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    setFormData({ ...formData, cpf: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulário: ' + formData);
    try {
      if ((userToEdit || currentUser.level !== 'admin')) {
        await UserService.updateUser(userToEdit.id, formData);
      } else {
        await UserService.createUser(formData);
      }
      onSave();
      setFormData({ username: '', name: '', level: '', password: '', cpf: '' });
      setErrorMessage('');
    } catch (error) {
      if (userToEdit){
        console.error('Erro ao editar usuário:', error);
        setErrorMessage('Erro ao editar o usuário!');

      }else{
        setErrorMessage('Erro ao salvar o usuário!');
        console.error('Erro ao salvar usuário:', error);  
      } 
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
      <input
        type="text"
        name="cpf"
        placeholder="CPF"
        value={formData.cpf}
        onChange={handleCPFChange}
        pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
        title="Digite um CPF no formato: 123.456.789-00"
        required
        maxLength="14"
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
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
    </form>
  
  )
};

export default UserForm;
