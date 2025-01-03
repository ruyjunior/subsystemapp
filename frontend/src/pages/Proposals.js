import React from 'react';
import '../styles/Main.css';

const Proposals = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="page">
        <h1>Propostas</h1>
        {user.level === 'admin' && <p>Acesso avançado às Propostas.</p>}
        {user.level === 'oper' && <p>Visualização básica de Propostas.</p>}
    </div> 
  );
};

export default Proposals;