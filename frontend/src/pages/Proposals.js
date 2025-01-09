import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Main.css';
import ProposalForm from '../components/forms/ProposalForm';
import ProposalPrint from '../components/forms/ProposalPrint';
import DBService from '../services/DBService';
const API_URL = 'http://localhost:5000/api/';

function Proposals() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [proposals, setProposals] = useState([]);
  const [clients, setClients] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [costs, setCosts] = useState([]);

  const [error, setError] = useState('');
  const [proposalToEdit, setproposalToEdit] = useState({
    idClient: '',
    idUser: '',
    idCost: '',
    idPlan:'',
    idPolicie:'',
  });
  const [proposalToPrint, setproposalToPrint] = useState({
    idClient: '',
    idUser: '',
    idCost: '',
    idPlan:'',
    idPolicie:'',
  });
  
  const fetchProposals = async () => {
    try {
      const response = await axios.get(API_URL + 'proposals', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProposals(response.data);
    } catch (err) {
      setError('Erro ao carregar as empresas.');
    }
  };
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

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL + "users", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data);
    } catch (err) {
      setError('Erro ao carregar os Usuários.');
    }
  };  

  const fetchPolicies = async () => {
    try {
      const response = await axios.get(API_URL + "policies", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPolicies(response.data);
    } catch (err) {
      setError('Erro ao carregar os Usuários.');
    }
  };  

  const fetchPlans = async () => {
    try {
      const response = await axios.get(API_URL + "plans", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPlans(response.data);
    } catch (err) {
      setError('Erro ao carregar os Usuários.');
    }
  };  

  const fetchCosts = async () => {
    try {
      const response = await axios.get(API_URL + "costs", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCosts(response.data);
    } catch (err) {
      setError('Erro ao carregar os Usuários.');
    }
  };  

  
  const handleDelete = async (id) => {
    try {
      await DBService.delete( API_URL, id);
      fetchProposals();
    } catch (error) {
      console.error('Erro ao deletar Empresas:', error);
    }
  };

  useEffect(() => {
    fetchProposals();
    fetchClients();
    fetchUsers();
    fetchPolicies();
    fetchPlans();
    fetchCosts();
  }, []);
  
  const handleEdit = (proposal) => {
    setproposalToEdit(proposal);
  };
  const handleSave = () => {
    setproposalToEdit(null);
    setproposalToPrint(null);
    fetchProposals();
  };
  const handlePrint = (proposal) => {
    setproposalToPrint(proposal);    
  }
    
  return (
    <div className="page">
      <h1>PROPOSTAS</h1>
      {currentUser.level === 'admin' ? (  <>
        <ProposalForm proposalToEdit={proposalToEdit} onSave={handleSave} 
          clients={clients} 
          policies={policies}
          plans={plans}
          costs={costs}
          />
        </>) : (
        <span>Sem previlégios!</span>
      )}
      <h2>Controle de Propostas</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="table">
        <thead>
          <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Operador</th>
          <th>Num Apólice</th>
          <th>Plano</th>
          <th>Faixa Etária de Custo</th>
          <th>Data de criação</th>
          <th>Controle</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => {
            const client = clients.find((c) => c.id === proposal.idClient);
            const user = users.find((u) => u.id === proposal.idUser);
            const policie = policies.find((p) => p.id === proposal.idPolicie);
            const plan = plans.find((p) => p.id === proposal.idPlan);
            const cost = costs.find((c) => c.id === proposal.idCost);
            return(
              <tr key={proposal.id}>
                <td>{proposal.id}</td>
                <td>{client ? client.name : 'Cliente não encontrada'}</td>
                <td>{user ? user.name : 'Usuário não encontrada'}</td>
                <td>{policie ? policie.number : 'Apólice não encontrada'}</td>
                <td>{plan ? plan.number : 'Plano não encontrada'}</td>
                <td>{cost ? cost.age : 'Custo não encontrada'}</td>
                <td>{proposal.timeStamp}</td>
                <td>
                <button onClick={() => handlePrint(proposal)}>Ver</button>
                  {currentUser.level === 'admin' && (
                  <>
                    <button onClick={() => handleEdit(proposal)}>Editar</button>
                    <button onClick={() => handleDelete(proposal.id)}>Excluir</button>
                  </>
                  )}
                </td>
              </tr>
            );
        })}
        </tbody>
      </table>
      <ProposalPrint 
        proposalToPrint={proposalToPrint}
        clients={clients} 
        policies={policies}
        plans={plans}
        costs={costs}       
      />
    </div>
  );
}

export default Proposals;