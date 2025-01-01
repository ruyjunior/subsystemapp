import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Clientes.css'; 
import ClientForm from '../components/ClientForm';
import ClientService from '../services/ClientService';

const API_URL = 'http://localhost:5000/api/clientes';

function Clientes() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [clients, setClients] = useState([]);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [error, setError] = useState('');
  
  const fetchClients = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setClients(response.data);
    } catch (err) {
      setError('Erro ao carregar os clientes.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await ClientService.deleteClient(id);
      fetchClients();
    } catch (error) {
      console.error('Erro ao deletar Cliente:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);
  
  const handleEdit = (client) => {
    setClientToEdit(client);
  };

  const handleSave = () => {
    setClientToEdit(null);
    fetchClients();
  };
    
  return (
    <div className="clientes-page">
      <h1>Novo Cliente</h1>

      {currentUser.level === 'admin' ? (  <>
      <ClientForm clientToEdit={clientToEdit} onSave={handleSave} />
      </>) : (
        <span>Sem previlégios!</span>
      )}

      <h1>Controle de Clientes</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="clientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Matrícula</th>
            <th>CPF</th>
            <th>Nome</th>
            <th>Nascimento</th>
            <th>Email</th>
            <th>Telefone 1</th>
            <th>Telefone 2</th>
            <th>Endereço</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>CEP</th>
            <th>ID-Lotação</th>
            <th>Controle</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.mat}</td>
              <td>{client.cpf}</td>
              <td>{client.name}</td>
              <td>{client.birth}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.phone2}</td>
              <td>{client.address}</td>
              <td>{client.city}</td>
              <td>{client.state}</td>
              <td>{client.cep}</td>
              <td>{client.idLotation}</td>
              <td>
                {currentUser.level === 'admin' && <>
                <button onClick={() => handleEdit(client)} >Editar</button>
                </>}
                {currentUser.level === 'admin' && <>
                <button onClick={() => handleDelete(client.id)}>Excluir</button>
                </>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;