import React, { useState, useEffect } from 'react';
import DBService from '../../services/DBService';
import '../../styles/Main.css';
const API_URL = 'http://localhost:5000/api/policies';


const PolicieForm = ({ companies, policieToEdit, onSave }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    id: '',
    number: '',
    idCompany: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); 
  
  useEffect(() => {
    if (policieToEdit) {
      setFormData(policieToEdit);
    }
  }, [policieToEdit]);

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
      if ((policieToEdit || currentUser.level !== 'admin')) {
        await DBService.update( API_URL, policieToEdit.id, formData);
      } else {
        await DBService.create(API_URL, formData);
      }
      onSave();
      setFormData({ id: '', number: '', idCompany: '' });
      setErrorMessage('');
    } catch (error) {
      if (policieToEdit){
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
      <h3>{policieToEdit || currentUser.level !== 'admin'  ? 'Editar Apolice' : 'Cadastrar Apolice'}</h3>
      <input
        type="text"
        name="number"
        placeholder="NÚMERO DA APÓLICE"
        title="Digite o número da Apólice"
        value={formData.number}
        onChange={handleNumberChange}
        maxLength="10"
        required
      />
      <select className='select'
        name="idCompany"
        title="EMPRESA: Selecione"
        value={formData.idCompany}
        onChange={handleChange}
        required
      >
        <option value="" disabled>Empresa: Selecione</option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
      <button type="submit" style={{ marginTop: '20px' }}>Salvar</button>
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
    </form>
  )
};

export default PolicieForm;
