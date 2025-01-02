import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Policies.css'; 
import PolicieForm from '../components/PolicieForm';
import PolicieService from '../services/PolicieService';

const API_URL = 'http://localhost:5000/api/';

function Policies() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [policies, setPolicies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [policieToEdit, setPolicieToEdit] = useState(null);
  const [error, setError] = useState('');
  
  const fetchPolicies = async () => {
    try {
      const response = await axios.get(API_URL + "policies", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPolicies(response.data);
    } catch (err) {
      setError('Erro ao carregar os Policies.');
    }
  };
  const fetchCompanies = async () => {
    try {
      const response = await axios.get(API_URL + "companies", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCompanies(response.data);
    } catch (err) {
      setError('Erro ao carregar os Empresas.');
    }
  };


  const handleDelete = async (id) => {
    try {
      await PolicieService.delete(id);
      fetchPolicies();
    } catch (error) {
      console.error('Erro ao deletar Policies:', error);
    }
  };

  useEffect(() => {
    fetchPolicies();
    fetchCompanies();
  }, []);
  
  const handleEdit = (apolice) => {
    setPolicieToEdit(apolice);
  };

  const handleSave = () => {
    setPolicieToEdit(null);
    fetchPolicies();
  };
    
  return (
    <div className="policies-page">
      {currentUser.level === 'admin' ? (  <>
      <PolicieForm apoliceToEdit={policieToEdit} onSave={handleSave} companies={companies}/>
      </>) : (
        <span>Sem previlégios!</span>
      )}
      <div>
      <h2>APÓLICES</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="policies-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NÚMERO</th>
            <th>ID Empresa</th>
            <th>Controle</th>
          </tr>
        </thead>
        <tbody>
        {policies.map((policie) => {
          // Busca o nome da empresa correspondente ao idCompany
          const company = companies.find((c) => c.id === policie.idCompany);

          return (
            <tr key={policie.id}>
              <td>{policie.id}</td>
              <td>{policie.number}</td>
              <td>{company ? company.name : 'Empresa não encontrada'}</td>
              <td>
                {currentUser.level === 'admin' && (
                  <>
                    <button onClick={() => handleEdit(policie)}>Editar</button>
                    <button onClick={() => handleDelete(policie.id)}>Excluir</button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      </table>
      </div>
    </div>
  );
}

export default Policies;