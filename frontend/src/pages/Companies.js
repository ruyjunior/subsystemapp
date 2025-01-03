import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Main.css';
import CompanyForm from '../components/forms/CompanyForm';
import DBService from '../services/DBService';

const API_URL = 'http://localhost:5000/api/companies';

function Companies() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [companies, setCompanies] = useState([]);
  const [companyToEdit, setCompanyToEdit] = useState(null);
  const [error, setError] = useState('');
  
  const fetchCompanies = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCompanies(response.data);
    } catch (err) {
      setError('Erro ao carregar as empresas.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await DBService.delete(API_URL, id);
      fetchCompanies();
    } catch (error) {
      console.error('Erro ao deletar Empresas:', error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);
  
  const handleEdit = (company) => {
    setCompanyToEdit(company);
  };

  const handleSave = () => {
    setCompanyToEdit(null);
    fetchCompanies();
  };
    
  return (
    <div className="page">
      <h1>EMPRESAS</h1>
      {currentUser.level === 'admin' ? (  <>
      <CompanyForm companyToEdit={companyToEdit} onSave={handleSave} />
      </>) : (
        <span>Sem previlégios!</span>
      )}
      <h2>Controle de Empresas</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>NOME</th>
            <th>CNPJ</th>
            <th>Controle</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.cnpj}</td>
                <td>
                  {currentUser.level === 'admin' && (
                  <>
                    <button onClick={() => handleEdit(company)}>Editar</button>
                    <button onClick={() => handleDelete(company.id)}>Excluir</button>
                  </>
                  )}
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Companies;