import React, { useState, useEffect } from 'react';
import DBService from '../../services/DBService';
import '../../styles/Main.css';
import axios from 'axios';


const API_URL = 'http://localhost:5000/api/';

const ProposalForm = ({ proposalToEdit, onSave, clients, policies, plans, costs }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [client, setClient] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    number:'',
    idClient: '',
    idUser: '',
    idCost: '',
    idPlan:'',
    idPolicie:'',
  });
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    if (proposalToEdit) {
      setFormData(proposalToEdit);
    }
  }, [proposalToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if ((proposalToEdit || currentUser.level !== 'admin')) {
        await DBService.update(API_URL + 'proposals', proposalToEdit.id, formData);
      } else {
        await DBService.create(API_URL + 'proposals', formData);
      }
      onSave();
      setFormData({  
        number:'',
        idClient: '',
        idUser: '',
        idCost: '',
        idPlan:'',
        idPolicie:'',
      });
      setErrorMessage('');
    } catch (error) {
      if (proposalToEdit){
        console.error('Erro ao editar Proposta:', error);
        setErrorMessage('Erro ao editar o Proposta!');

      }else{
        setErrorMessage('Erro ao salvar o Proposta!');
        console.error('Erro ao salvar Proposta:', error);  
      } 
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ flex: 1 }}>
      <h3>{proposalToEdit || currentUser.level !== 'admin'  ? 'Editar Proposta' : 'Cadastrar Proposta'}</h3>
      <input
        type="text"
        name="number"
        placeholder="NÚMERO DA PROPOSTA"
        title="Digite o número da Proposta"
        value={formData.number}
        onChange={handleChange}
        maxLength="20"
        required
      />
      <select className='select'
        name="idClient"
        title="Cliente: Selecione"
        value={formData.idClient}
        onChange={handleChange}
        required
      >
        <option value="" disabled>Cliente: Selecione</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <select className='select'
        name="idPolicier"
        title="Apólice: Selecione"
        value={formData.idPolicie}
        onChange={handleChange}
        required
      >
        <option value="" disabled>Apólice: Selecione</option>
        {policies.map((policie) => (
          <option key={policie.id} value={policie.id}>
            {policie.number}
          </option>
        ))}
      </select>

      <select className='select'
        name="idPlan"
        title="Plano: Selecione"
        value={formData.idPlan}
        onChange={handleChange}
        required
      >
        <option value="" disabled>Plano: Selecione</option>
        {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.number} 
            </option> 
        ))}
      </select>
      
      <select className='select'
        name="idCost"
        title="Faixa Etária: Selecione"
        value={formData.idCost}
        onChange={handleChange}
        required
      >
        <option value="" disabled>Faixa: Selecione</option>
        {costs.map((cost) => (
            <option key={cost.id} value={cost.id}>
              {cost.age} 
            </option> 
        ))}
      </select>


      <button type="submit">Salvar</button>
      { errorMessage && <div>{errorMessage}</div>}
    </form>
  )
};

export default ProposalForm;
