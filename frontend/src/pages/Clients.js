import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Main.css';
import ClientForm from '../components/forms/ClientForm';
import DBService from '../services/DBService';

const API_URL = 'http://localhost:5000/api/';

function Clients() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [clients, setClients] = useState([]);
  const [lotations, setLotations] = useState([]);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [error, setError] = useState('');
  
  const fetchClients = async () => {
    try {
      const response = await axios.get(API_URL + "clients", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setClients(response.data);
    } catch (err) {
      setError('Erro ao carregar os clientes.');
    }
  };
  
  const fetchLotations = async () => {
    try {
      const response = await axios.get(API_URL + "lotations", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setLotations(response.data);
    } catch (err) {
      setError('Erro ao carregar os Empresas.');
    }
  };


  const handleDelete = async (id) => {
    try {
      await DBService.delete(API_URL + "clients", id);
      fetchClients();
    } catch (error) {
      console.error('Erro ao deletar Cliente:', error);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchLotations();
  }, []);
  
  const handleEdit = (client) => {
    setClientToEdit(client);
  };

  const handleSave = () => {
    setClientToEdit(null);
    fetchClients();
  };
    
  return (
    <div className="page">
      <h1>CLIENTES</h1>
      {currentUser.level === 'admin' ? (  <>
      <ClientForm clientToEdit={clientToEdit} onSave={handleSave} lotations={lotations}/>
      </>) : (
        <span>Sem previlégios!</span>
      )}

      <h2>Controle de Clientes</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="table">
        <thead>
          <tr>
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
            <th>Lotação</th>
            <th>Controle</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            const lotation = lotations.find((c) => c.id === client.idLotation);
            return (
            <tr key={client.id}>
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
              <td>{lotation ? lotation.name : 'Lotação não encontrada'}</td>
              <td>
                {currentUser.level === 'admin' && (
                  <>
                    <button onClick={() => handleEdit(client)}>Editar</button>
                    <button onClick={() => handleDelete(client.id)}>Excluir</button>
                  </>
                )}
              </td>
            </tr>
            );  
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;