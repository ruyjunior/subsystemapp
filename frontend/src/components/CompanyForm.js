import React, { useState, useEffect } from 'react';
import CompanyService from '../services/CompanyService';
import '../pages/styles/Companies.css'; 


const CompanyForm = ({ companyToEdit, onSave }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    cnpj: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); 
  
  useEffect(() => {
    if (companyToEdit) {
      setFormData(companyToEdit);
    }
  }, [companyToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };  
  /*Manipulação para CNPJ*/
  const handleCNPJChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (value.length > 2) value = value.replace(/(\d{2})(\d)/, "$1.$2");
    if (value.length > 5) value = value.replace(/(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    if (value.length > 8) value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
    if (value.length > 12) value = value.replace(/(\d{4})(\d)/, '$1-$2');
    setFormData({ ...formData, cnpj: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if ((companyToEdit || currentUser.level !== 'admin')) {
        await CompanyService.update(companyToEdit.id, formData);
      } else {
        await CompanyService.create(formData);
      }
      onSave();
      setFormData({ id: '', name: '', cnpj: '' });
      setErrorMessage('');
    } catch (error) {
      if (companyToEdit){
        console.error('Erro ao editar Empresa:', error);
        setErrorMessage('Erro ao editar o Empresa!');

      }else{
        setErrorMessage('Erro ao salvar o Empresa!');
        console.error('Erro ao salvar Empresa:', error);  
      } 
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start' }}> 
        <div style={{ border: '5px solid #ccc', padding: '10px', width: '50%' }}>
            <h2>{companyToEdit || currentUser.level !== 'admin'  ? 'Editar Empresa' : 'Criar Empresa'}</h2>
            <input
              type="text"
              name="name"
              placeholder="NOME FANTASIA"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cnpj"
              placeholder="CNPJ"
              value={formData.cnpj}
              onChange={handleCNPJChange}
              pattern="\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}"
              maxLength="18"
              required
            />
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Salvar</button>
        {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
      </div>
    </form>
  
  )
};

export default CompanyForm;
