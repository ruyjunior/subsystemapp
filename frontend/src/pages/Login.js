import '../styles/Main.css';
import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess, onLogout }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
    setSuccessMessage(''); 
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      if (response.data.token) {
        console.log('Login bem-sucedido:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setSuccessMessage('Login realizado com sucesso!'); // Mensagem de sucesso
        onLoginSuccess(response.data); // Passa os dados ao pai
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Erro ao realizar login. Tente novamente.'
      );
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {!localStorage.token && (
          <>
            <h2>Insira Usuário e Senha </h2>
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </>
        )}
      </form>
      {localStorage.token && (
        <div className="logout-container">
          <p className='logout-mensage'>Você já está logado no Sistema!</p>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
}
export default Login;