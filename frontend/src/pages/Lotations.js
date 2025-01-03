import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Main.css';
import LotationForm from '../components/forms/LotationForm';
import DBService from '../services/DBService';

const API_URL = 'http://localhost:5000/api/lotations';

function Lotations() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [lotations, setLotations] = useState([]);
  const [LotationToEdit, setLotationToEdit] = useState(null);
  const [error, setError] = useState('');
  
  const fetchLotations = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setLotations(response.data);
    } catch (err) {
      setError('Erro ao carregar as empresas.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await DBService.delete( API_URL, id);
      fetchLotations();
    } catch (error) {
      console.error('Erro ao deletar Empresas:', error);
    }
  };

  useEffect(() => {
    fetchLotations();
  }, []);
  
  const handleEdit = (Lotation) => {
    setLotationToEdit(Lotation);
  };

  const handleSave = () => {
    setLotationToEdit(null);
    fetchLotations();
  };
    
  return (
    <div className="page">
      <h1>LOTAÇÕES</h1>
      {currentUser.level === 'admin' ? (  <>
      <LotationForm LotationToEdit={LotationToEdit} onSave={handleSave} />
      </>) : (
        <span>Sem previlégios!</span>
      )}
      <h2>Controle de Lotações</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>NOME</th>
            <th>Controle</th>
          </tr>
        </thead>
        <tbody>
          {lotations.map((Lotation) => (
              <tr key={Lotation.id}>
                <td>{Lotation.name}</td>
                <td>
                  {currentUser.level === 'admin' && (
                  <>
                    <button onClick={() => handleEdit(Lotation)}>Editar</button>
                    <button onClick={() => handleDelete(Lotation.id)}>Excluir</button>
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

export default Lotations;