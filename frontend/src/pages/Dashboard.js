import React from 'react';
import './Pages.css';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="pages">
        <h1>Dashboard</h1>
        {user.level === 'admin' && <p>Acesso avançado ao Dashboard.</p>}
        {user.level === 'oper' && <p>Visualização básica de Dashboard.</p>}
    </div> 
  );
};

export default Dashboard;