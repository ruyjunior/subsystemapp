import React, { useState, useEffect } from 'react';
import PolicieService from '../services/PolicieService';
import '../pages/styles/Policies.css'; 


const PolicieForm = ({ companies, apoliceToEdit, onSave }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    id: '',
    number: '',
    idCompany: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); 
  
  useEffect(() => {
    if (apoliceToEdit) {
      setFormData(apoliceToEdit);
    }
  }, [apoliceToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };  
  /*Manipulação para Apolice*/
  const handleNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (value.length > 2) value = value.replace(/(\d{2})(\d)/, "$1.$2");
    if (value.length > 5) value = value.replace(/(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    setFormData({ ...formData, number: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if ((apoliceToEdit || currentUser.level !== 'admin')) {
        await PolicieService.update(apoliceToEdit.id, formData);
      } else {
        await PolicieService.create(formData);
      }
      onSave();
      setFormData({ id: '', number: '', idCompany: '' });
      setErrorMessage('');
    } catch (error) {
      if (apoliceToEdit){
        console.error('Erro ao editar Apolice:', error);
        setErrorMessage('Erro ao editar o Apolice!');

      }else{
        setErrorMessage('Erro ao salvar o Apolice!');
        console.error('Erro ao salvar Apolice:', error);  
      } 
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start' }}> 
        {/* Seção 1 */}
        <div style={{ border: '5px solid #ccc', padding: '20px', width: '30%' }}>
            <h2>{apoliceToEdit || currentUser.level !== 'admin'  ? 'Editar Apolice' : 'Criar Apolice'}</h2>
            <input
              type="text"
              name="number"
              placeholder="NÚMERO"
              value={formData.number}
              onChange={handleNumberChange}
              maxLength="10"
              required
            />
            <input
              type="text"
              name="idCompany"
              placeholder="ID Empresa"
              value={formData.idCompany}
              onChange={handleChange}
              required
            />
            <select
              name="idCompany"
              value={formData.idCompany}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecione uma empresa</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            <button type="submit" style={{ marginTop: '20px' }}>Salvar</button>
            {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
        </div>
      </div>
    </form>
  
  )
};

export default PolicieForm;
