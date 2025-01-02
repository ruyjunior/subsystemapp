import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Lotations.css'; 
import LotationForm from '../components/LotationForm';
import LotationService from '../services/LotationService';

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
      await LotationService.delete(id);
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
    <div className="lotations-page">
      <h2>LOTAÇÕES</h2>
      {currentUser.level === 'admin' ? (  <>
      <LotationForm LotationToEdit={LotationToEdit} onSave={handleSave} />
      </>) : (
        <span>Sem previlégios!</span>
      )}
      
      {error && <p className="error-message">{error}</p>}
      <table className="lotations-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>Controle</th>
          </tr>
        </thead>
        <tbody>
          {lotations.map((Lotation) => (
              <tr key={Lotation.id}>
                <td>{Lotation.id}</td>
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