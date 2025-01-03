import React, { useState, useEffect } from 'react';
import DBService from '../../services/DBService';
import '../../styles/Main.css';
const API_URL = 'http://localhost:5000/api/plans';


const PlanForm = ({ plans, planToEdit, onSave }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    id: '',
    valueDeath:'',
    valueDeathAccident: '',
    valueInvalidityAccident: '',
    valueInvaliditySickness: '',
    valueMonthlyLot: '',
    valueSAF: '', 
    idPolicie:''
  });
  const [errorMessage, setErrorMessage] = useState(''); 
  
  useEffect(() => {
    if (planToEdit) {
      setFormData(planToEdit);
    }
  }, [planToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if ((planToEdit || currentUser.level !== 'admin')) {
        await DBService.update( API_URL, planToEdit.id, formData);
      } else {
        await DBService.create(API_URL, formData);
      }
      onSave();
      setFormData({
        id: '',
        valueDeath:'',
        valueDeathAccident: '',
        valueInvalidityAccident: '',
        valueInvaliditySickness: '',
        valueMonthlyLot: '',
        valueSAF: '', 
        idPolicie:'' 
      });
      setErrorMessage('');
    } catch (error) {
      if (planToEdit){
        console.error('Erro ao editar plan:', error);
        setErrorMessage('Erro ao editar o plan!');
      }else{
        setErrorMessage('Erro ao salvar o plan!');
        console.error('Erro ao salvar plan:', error);  
      } 
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <h3>{planToEdit || currentUser.level !== 'admin'  ? 'Editar Plano' : 'Cadastrar Plano'}</h3>
      <input
        type="text"
        name="number"
        placeholder="VALOR MORTE"
        title="Digite o valor pago por Morte"
        value={formData.valueDeath}
        onChange={handleChange}
        maxLength="10"
        required
      />
            <input
        type="text"
        name="number"
        placeholder="VALOR MORTE / ACIDENTE"
        title="Digite o valor pago no caso de Morte por Acidente"
        value={formData.valueDeathAccident}
        onChange={handleChange}
        maxLength="10"
        required
      />
      <input
        type="text"
        name="number"
        placeholder="VALOR INVALIDEZ / ACIDENTE"
        title="Digite o valor pago no caso de Invalidez por Acidente"
        value={formData.valueInvalidityAccident}
        onChange={handleChange}
        maxLength="10"
        required
      />
      <input
        type="text"
        name="number"
        placeholder="VALOR INVALIDEZ / DOENÇA"
        title="Digite o valor pago no caso de Invalidez por doença"
        value={formData.valueInvaliditySickness}
        onChange={handleChange}
        maxLength="10"
        required
      />
      <input
        type="text"
        name="number"
        placeholder="VALOR SORTEIO MENSAL"
        title="Digite o valor pago em Sorteio Mensal"
        value={formData.valueMonthlyLot}
        onChange={handleChange}
        maxLength="10"
        required
      />
      <input
        type="text"
        name="number"
        placeholder="VALOR SAF"
        title="Digite o valor da SAF Familiar"
        value={formData.valueSAF}
        onChange={handleChange}
        maxLength="10"
        required
      />

      <button type="submit">Salvar</button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
};

export default PlanForm;
