import React from 'react';
import './styles/Header.css';

const Header = ({user}) => (
  <header className="header">
      <div className="header-left">
        <h1>Vida SubSystem</h1>
      </div>
      <div className="header-right">
        {user.name && <>
          <span>Olá, {user.name}!</span>
          <span>Nível: {user.level} </span>
        </>}
        {!user.name && <span>Ninguém Logado...</span>}
      </div>
  </header>
);

export default Header;