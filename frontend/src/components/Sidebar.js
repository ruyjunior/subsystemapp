import React from 'react';
import './styles/Sidebar.css';

const Sidebar = () => (
  <nav className="sidebar">
    <ul>
      <li><a href="/">Dashboard</a></li>
      <li><a href="/proposals">Propostas</a></li>
      <li><a href="/policies">Apólices</a></li>
      <li><a href="/lotations">Lotações</a></li>
      <li><a href="/companies">Empresas</a></li>
      <li><a href="/clients">Clientes</a></li>
      <li><a href="/users">Usuários</a></li>
      <li><a href="/login">Login</a></li>
    </ul>
  </nav>
);

export default Sidebar;
