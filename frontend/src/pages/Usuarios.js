import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Usuarios.css'; // Se precisar de estilização

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/usuarios', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsuarios(response.data);
      } catch (err) {
        setError('Erro ao carregar os usuários.');
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="usuarios-page">
      <h1>Lista de Usuários</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Nome</th>
            <th>Nível</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.username}</td>
              <td>{usuario.name}</td>
              <td>{usuario.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
