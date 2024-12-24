import React from 'react';
import './styles/Sidebar.css';

const Sidebar = () => (
  <nav className="sidebar">
    <ul>
      <li><a href="/">Dashboard</a></li>
      <li><a href="/propostas">Propostas</a></li>
      <li><a href="/apolices">Apólices</a></li>
      <li><a href="/clientes">Clientes</a></li>
      <li><a href="/usuarios">Usuários</a></li>
      <li><a href="/login">Login</a></li>
    </ul>
  </nav>
);

export default Sidebar;
