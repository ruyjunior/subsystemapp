/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Usuarios.css'; // Se precisar de estilização

const Usuarios = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/usuarios', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsuarios(response.data);
        console.log(usuarios);
      } catch (err) {
        setError('Erro ao carregar os usuários.');
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="pages">
        <h1>Usuarios</h1>
        {user.level === 'admin' && <p>Acesso avançado aos Usuários.</p>}
        {user.level === 'oper' && <p>Visualização básica de Usuários.</p>}
    </div> 
  );
};

export default Usuarios;    */


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Usuarios.css'; // Se precisar de estilização

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
