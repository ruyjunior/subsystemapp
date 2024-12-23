import React from 'react';
import './Pages.css';

const Apolices = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="pages">
        <h1>Apólices</h1>
        {user.level === 'admin' && <p>Acesso avançado às Apólices.</p>}
        {user.level === 'oper' && <p>Visualização básica de Apólices.</p>}
    </div> 
  );
};

export default Apolices;