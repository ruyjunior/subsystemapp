import React from 'react';
import './Pages.css';

const Clientes = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="pages">
        <h1>Clientes</h1>
        {user.level === 'admin' && <p>Acesso avançado aos Clientes.</p>}
        {user.level === 'oper' && <p>Visualização básica de Clientes.</p>}
    </div> 
  );
};

export default Clientes;