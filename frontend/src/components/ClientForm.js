import React, { useState, useEffect } from 'react';
import ClientService from '../services/ClientService';
import '../pages/styles/Clients.css'; 


const ClientForm = ({ clientToEdit, onSave }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    id: '',
    mat: '',
    cpf: '',
    name: '',
    birth: '',
    birthDate: '',
    email: '',
    phone: '',
    phone2: '',
    address:'',
    city:'',
    state:'',
    cep:'',
    idLotation: ''
  });
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    if (clientToEdit) {
      //setFormData(clientToEdit);
      setFormData({...formData, 
        mat: clientToEdit.mat,
        cpf: clientToEdit.cpf,
        name: clientToEdit.name,
        birth: clientToEdit.birth,
        birthDate: convertDateToRegularFormat(clientToEdit.birth),
        email: clientToEdit.email,
        phone: clientToEdit.phone,
        phone2: clientToEdit.phone2,
        address:clientToEdit.address,
        city:clientToEdit.city,
        state:clientToEdit.state,
        cep:clientToEdit.cep,
        idLotation: clientToEdit.idLotation});
    }
  }, [clientToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };  
  /*Manipulação para CPF*/
  const handleCPFChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (value.length > 3) value = value.replace(/(\d{3})(\d)/, "$1.$2");
    if (value.length > 6) value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (value.length > 9) value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    setFormData({ ...formData, cpf: value });
  };
  /*Manipulação para Data*/
  const handleBirthChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (value.length > 2) value = value.replace(/(\d{2})(\d)/, "$1/$2"); // Insere a barra após o dia
    if (value.length > 5) value = value.replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3"); // Insere a barra após o mês
    value = value.substring(0, 10); // Limita o comprimento a 10 caracteres (DD/MM/AAAA)
    const formattedDate = convertDateToMySQLFormat(value);
    setFormData({ ...formData, birthDate: value, birth: formattedDate}); // Atualiza o estado com a data formatada
  };
  /*Manipulação para CEP*/
  const handleCEPChange = (event) => {
    let input = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (input.length > 5) {
      input = input.replace(/^(\d{5})(\d{0,3})$/, "$1-$2"); // Adiciona o hífen após os primeiros 5 dígitos
    }
    event.target.value = input;
    handleChange(event); // Atualiza o estado com o valor formatado
  };
  /*Manipulação para Telefones*/
  const handlePhoneChange = (event) => {
    let input = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (input.length > 10) {
      input = input.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3"); // Formato para celulares
    } else if (input.length > 6) {
      input = input.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3"); // Formato para fixos
    } else if (input.length > 2) {
      input = input.replace(/^(\d{2})(\d{0,4})$/, "($1) $2"); // Apenas DDD e prefixo
    } else {
      input = input.replace(/^(\d*)$/, "($1"); // Apenas DDD
    }
    event.target.value = input;
    handleChange(event); // Atualiza o estado com o valor formatado
  };
  
  const convertDateToMySQLFormat = (date) => {
    if (!date) return "";
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };
  const convertDateToRegularFormat = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.birth);
    try {
      if ((clientToEdit || currentUser.level !== 'admin')) {
        await ClientService.updateClient(clientToEdit.id, formData);
      } else {
        await ClientService.createClient(formData);
      }
      onSave();
      setFormData({ id: '', mat: '', cpf: '',
                  name: '', birth: '', birthDate: '', email:'',
                  phone:'', phone2:'', address:'',
                  city:'', state:'', cep:'', idLotation:'' });
      setErrorMessage('');
    } catch (error) {
      if (clientToEdit){
        console.error('Erro ao editar Cliente:', error);
        setErrorMessage('Erro ao editar o Cliente!');

      }else{
        setErrorMessage('Erro ao salvar o Cliente!');
        console.error('Erro ao salvar Cliente:', error);  
      } 
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ flex: 1 }}>
      <h2>{clientToEdit || currentUser.level !== 'admin'  ? 'Editar Cliente' : 'Criar Cliente'}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start' }}> 
       {/* Seção 1 */}
       <div style={{ border: '5px solid #ccc', padding: '10px', width: '30%' }}>
          <input
            type="text"
            name="mat"
            placeholder="Matricula"
            value={formData.mat}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleCPFChange}
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            title="Digite um CPF no formato: 123.456.789-00"
            required
            maxLength="14"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="birth"
            placeholder="DD/MM/AAAA"
            value={formData.birthDate}
            onChange={handleBirthChange}
            pattern="\d{2}\/\d{2}\/\d{4}"
            title="Digite a data de nascimento no formato: DD/MM/AAAA"
            required
            maxLength="12"
          />
        </div>
        {/* Seção 2 */}
        <div style={{ border: '5px solid #ccc', padding: '10px', width: '30%' }}>
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={handleChange}
            title="Digite um email válido, como exemplo@dominio.com"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="(xx) 12345-6789"
            value={formData.phone}
            onChange={handlePhoneChange}
            pattern="\(\d{2}\) \d{4,5}-\d{4}"
            title="Digite o telefone no formato: (DDD) 12345-6789 ou (DDD) 1234-5678"
            required
            maxLength="15"
          />
          <input
            type="text"
            name="phone2"
            placeholder="(xx) 12345-6789"
            value={formData.phone2}
            onChange={handlePhoneChange}
            pattern="\(\d{2}\) \d{4,5}-\d{4}"
            title="Digite o telefone no formato: (DDD) 12345-6789 ou (DDD) 1234-5678"
            //required
            maxLength="15"
          />
          <input
            type="text"
            name="address"
            placeholder="Endereço"
            value={formData.address}
            onChange={handleChange}
            title="Insira o endereço"
            required
          />
        </div>
          {/* Seção 3 */}
          <div style={{ border: '5px solid #ccc', padding: '10px', width: '30%' }}>
          <input
            type="text"
            name="cep"
            placeholder="CEP (12345-678)"
            value={formData.cep}
            onChange={handleCEPChange}
            pattern="\d{5}-\d{3}"
            title="Digite o CEP no formato: 12345-678"
            required
            maxLength="9"
          />
          <input
            type="text"
            name="city"
            placeholder="Cidade"
            value={formData.city}
            onChange={handleChange}
            title="Digite a Cidade"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="Estado"
            value={formData.state}
            onChange={handleChange}
            required
            title="Digite apenas as duas letras do Estado ex: Bahia: BA"
            maxLength="2"
          />
          <input
            type="text"
            name="idLotation"
            placeholder="ID da Lotação"
            value={formData.idLotation}
            onChange={handleChange}
            title="Digite o ID da Lotaçãio"
            required
          />
       </div>
       </div>
      <button type="submit" style={{ marginTop: '20px' }}>Salvar</button>
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
    </form>
  
  )
};

export default ClientForm;
