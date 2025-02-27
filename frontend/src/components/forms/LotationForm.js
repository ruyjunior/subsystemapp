import React, { useState, useEffect } from 'react';
import DBService from '../../services/DBService';
import '../../styles/Main.css';

const API_URL = 'http://localhost:5000/api/lotations';

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
        await DBService.update(API_URL, LotationToEdit.id, formData);
      } else {
        await DBService.create(API_URL, formData);
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
      <h3>{LotationToEdit || currentUser.level !== 'admin'  ? 'Editar Lotação' : 'Cadastrar Lotação'}</h3>
      <input
        type="text"
        name="name"
        placeholder="NOME DA LOTAÇÃO"
        title="Digite o nome para Lotação"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <button type="submit" style={{ marginTop: '20px' }}>Salvar</button>
      { errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
    </form>
  
  )
};

export default LotationForm;
