import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Main.css'; 
import PolicieForm from '../components/forms/PolicieForm';
import CostForm from '../components/forms/CostForm';
import PlanForm from '../components/forms/PlanForm';
import DBService from '../services/DBService';

const API_URL = 'http://localhost:5000/api/';

function Policies() {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [policies, setPolicies] = useState([]);
  const [policieToEdit, setPolicieToEdit] = useState(null);

  const [plans, setPlans] = useState([]);
  const [planToEdit, setPlanToEdit] = useState(null);

  const [costs, setCosts] = useState([]);
  const [costToEdit, setCostToEdit] = useState(null);

  const [companies, setCompanies] = useState([]);
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
  const fetchPlans = async () => {
    try {
      const response = await axios.get(API_URL + "plans", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPlans(response.data);
    } catch (err) {
      setError('Erro ao carregar os Planos.');
    }
  };
  const fetchCosts = async () => {
    try {
      const response = await axios.get(API_URL + "costs", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCosts(response.data);
    } catch (err) {
      setError('Erro ao carregar os Custos.');
    }
  };

  const handleDeletePolicies = async (id) => {
    try {
      await DBService.delete(API_URL + "policies", id);
      fetchPolicies();
    } catch (error) {
      console.error('Erro ao deletar Policies:', error);
    }
  };
  const handleDeletePlans = async (id) => {
    try {
      await DBService.delete(API_URL + "plans", id);
      fetchPlans();
    } catch (error) {
      console.error('Erro ao deletar Plans:', error);
    }
  };
  const handleDeleteCosts = async (id) => {
    try {
      await DBService.delete(API_URL + "costs", id);
      fetchCosts();
    } catch (error) {
      console.error('Erro ao deletar Custos:', error);
    }
  };

  useEffect(() => {
    fetchPolicies();
    fetchPlans();
    fetchCosts();
    fetchCompanies();
  }, []);
  
  const handleEditPolicie = (policie) => {
    setPolicieToEdit(policie);
  };
  const handleEditPlan = (plan) => {
    setPlanToEdit(plan);
  };
  const handleEditCost = (cost) => {
    setCostToEdit(cost);
  };

  const handleSavePolicie = () => {
    setPolicieToEdit(null);
    fetchPolicies();
  };
  const handleSavePlan = () => {
    setPlanToEdit(null);
    fetchPlans();
  };
  const handleSaveCost = () => {
    setCostToEdit(null);
    fetchCosts();
  };
    
  return (
    <div className="page">
      <h1>APÓLICES</h1>
      <div className='divmain'>
        {currentUser.level === 'admin' ? (  <>
        <div className='divsec'>
          <PolicieForm policieToEdit={policieToEdit} onSave={handleSavePolicie} companies={companies}/>
        </div>
        <div className='divsec'>
          <PlanForm planToEdit={planToEdit} onSave={handleSavePlan} plans={plans}/>
        </div>
        <div className='divsec'>
          <CostForm costToEdit={costToEdit} onSave={handleSaveCost} costs={costs} policies={policies}/>
        </div>
          </>) : (
        <span>Sem previlégios!</span>
        )}
      </div>

      <div>
      <h2>Controle de Apólices</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Número</th>
            <th>Empresa</th>
            <th>Controle</th>
          </tr>
        </thead>
        <tbody>
        {policies.map((policie) => {
          // Busca o nome da empresa correspondente ao idCompany
          const company = companies.find((c) => c.id === policie.idCompany);

          return (
            <tr key={policie.id}>
              <td>{policie.number}</td>
              <td>{company ? company.name : 'Empresa não encontrada'}</td>
              <td>
                {currentUser.level === 'admin' && (
                  <>
                    <button onClick={() => handleEditPolicie(policie)}>Editar</button>
                    <button onClick={() => handleDeletePolicies(policie.id)}>Excluir</button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      </table>
      <h2>Planos</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Linha</th>
            <th>Morte</th>
            <th>Morte/Acidente</th>
            <th>Invalidez/Acidente</th>
            <th>Invalidez/Doença</th>
            <th>Mensal</th>
            <th>SAF</th>
            <th>Apólice</th>
            <th>Controle</th>
          </tr>
        </thead>
        <tbody>
        {plans.map((plan) => {
          return (
            <tr key={plan.id}>
              <td>{plan.id}</td>
              <td>{plan.number}</td>
              <td>{plan.valueDeath}</td>
              <td>{plan.valueDeathAccident}</td>
              <td>{plan.valueInvalidityAccident}</td>
              <td>{plan.valueInvaliditySickness}</td>
              <td>{plan.valueMonthlyLot}</td>
              <td>{plan.valueSAF}</td>
              <td>{plan.idPolicie}</td>
              <td>
                {currentUser.level === 'admin' && (
                  <>
                    <button onClick={() => handleEditPlan(plan)}>Editar</button>
                    <button onClick={() => handleDeletePlans(plan.id)}>Excluir</button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      </table>

      <h2>Custos</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Faixa de Idade</th>
            <th>Titular</th>
            <th>Titular+Conjuge</th>
            <th>Linha Plano</th>
            <th>Apólice</th>
            <th>Controle</th>
          </tr>
        </thead>
        <tbody>
        {costs.map((cost) => {
          return (
            <tr key={cost.id}>
              <td>{cost.id}</td>
              <td>{cost.age}</td>
              <td>{cost.valueTitular}</td>
              <td>{cost.valueTitularCouple}</td>
              <td>{cost.numberPlan}</td>
              <td>{cost.idPolicie}</td>
              <td>
                {currentUser.level === 'admin' && (
                  <>
                    <button onClick={() => handleEditCost(cost)}>Editar</button>
                    <button onClick={() => handleDeleteCosts(cost.id)}>Excluir</button>
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