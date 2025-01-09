import React, { useState, useEffect } from 'react';
import DBService from '../../services/DBService';
import '../../styles/Main.css';
const API_URL = 'http://localhost:5000/api/costs';


const CostForm = ({ costs, costToEdit, onSave, policies }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    id: '',
    age: '',
    valueTitular:'',
    valueTitularCouple:'',
    numberPlan:'', 
    idPolicie:''
  });
  const [errorMessage, setErrorMessage] = useState(''); 
  
  useEffect(() => {
    if (costToEdit) {
      setFormData(costToEdit);
    }
  }, [costToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if ((costToEdit || currentUser.level !== 'admin')) {
        await DBService.update( API_URL, costToEdit.id, formData);
      } else {
        await DBService.create(API_URL, formData);
      }
      onSave();
      setFormData({
        id: '',
        age: '',
        valueTitular:'',
        valueTitularCouple:'',
        numberPlan:'', 
        idPolicie:''
      });
      setErrorMessage('');
    } catch (error) {
      if (costToEdit){
        console.error('Erro ao editar cost:', error);
        setErrorMessage('Erro ao editar o cost!');
      }else{
        setErrorMessage('Erro ao salvar o cost!');
        console.error('Erro ao salvar cost:', error);  
      } 
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <h3>{costToEdit || currentUser.level !== 'admin'  ? 'Editar Custo' : 'Cadastrar Custo'}</h3>
   
      <select className='select'
        name="idPolicie"
        title="APÓLICIE: Selecione"
        value={formData.idPolicie}
        onChange={handleChange}
        required
      >
        <option value="" disabled>Apólices: Selecione</option>
        {policies.map((policie) => (
          <option key={policie.id} value={policie.id}>
            {policie.number}
          </option>
        ))}
      </select>

      <input
      type="text"
      name="age"
      placeholder="FAIXA DE IDADE"
      title="Digite a faixa de idade"
      value={formData.age}
      onChange={handleChange}
      maxLength="2"
      required
      />
      <input
        type="text"
        name="numberPlan"
        placeholder="LINHA PLANO"
        title="Digite a linha do Plano"
        value={formData.numberPlan}
        onChange={handleChange}
        maxLength="2"
        required
      />
      <input
        type="text"
        name="valueTitular"
        placeholder="VALOR TITULAR"
        title="Digite o valor do Titular"
        value={formData.valueTitular}
        onChange={handleChange}
        maxLength="10"
        required
      />
      <input
        type="text"
        name="valueTitularCouple"
        placeholder="VALOR TITULAR + CONJUGE"
        title="Digite o valor do Titular + Conjuge"
        value={formData.valueTitularCouple}
        onChange={handleChange}
        maxLength="10"
        required
      />
      <button type="submit">Salvar</button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
};

export default CostForm;
