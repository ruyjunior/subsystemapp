import React, { useState, useEffect } from 'react';
import LotationService from '../services/LotationService';
import '../pages/styles/Lotations.css'; 


const LotationForm = ({ LotationToEdit, onSave }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    id: '',
    name: ''
  });
  const [errorMessage, setErrorMessage] = useState(''); 
  
  useEffect(() => {
    if (LotationToEdit) {
      setFormData(LotationToEdit);
    }
  }, [LotationToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if ((LotationToEdit || currentUser.level !== 'admin')) {
        await LotationService.update(LotationToEdit.id, formData);
      } else {
        await LotationService.create(formData);
      }
      onSave();
      setFormData({ id: '', name: '' });
      setErrorMessage('');
    } catch (error) {
      if (LotationToEdit){
        console.error('Erro ao editar Lotação:', error);
        setErrorMessage('Erro ao editar o Lotação!');

      }else{
        setErrorMessage('Erro ao salvar o Lotação!');
        console.error('Erro ao salvar Lotação:', error);  
      } 
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start' }}> 
        <div style={{ border: '5px solid #ccc', padding: '10px', width: '70%' }}>
            <h2>{LotationToEdit || currentUser.level !== 'admin'  ? 'Editar Lotação' : 'Criar Lotação'}</h2>
            <input
              type="text"
              name="name"
              placeholder="NOME DA LOTAÇÃO"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <button type="submit" style={{ marginTop: '20px' }}>Salvar</button>
            { errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
        </div>
      </div>
    </form>
  
  )
};

export default LotationForm;
