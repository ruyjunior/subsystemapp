import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import Dashboard from './pages/Dashboard';
import Propostas from './pages/Propostas';
import Apolices from './pages/Apolices';
import Clientes from './pages/Clientes';
import Usuarios from './pages/Usuarios';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';


const PageLayout = ({ children, user }) => {
  return (
    <div className="app-layout">
      <Header  user={user}/>
      <div className="main-layout">
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  const [user, setUser] = useState('');
  
  useEffect(() => {
    // Verifica se há dados salvos no localStorage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser)); // Atualiza o estado com os dados do usuário
    }
  }, []);

  const handleLoginSuccess = (data) => {
    setUser(data.user); // Atualiza o estado do usuário
  }
  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(''); // Limpa o estado do usuário
    window.location.href = '/Login'; // Redireciona para a página de login

  }

  return (
    <Router>
      <PageLayout user={user}>
        <Routes>
        <Route path="/login"        element={ <Login onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} />} />
        <Route path="/propostas"    element={ <PrivateRoute> <Propostas /> </PrivateRoute>} />
        <Route path="/apolices"     element={ <PrivateRoute> <Apolices  /> </PrivateRoute>} />
        <Route path="/clientes"     element={ <PrivateRoute> <Clientes/>   </PrivateRoute>} />
        <Route path="/usuarios"     element={ <PrivateRoute> <Usuarios  /> </PrivateRoute>} />
        <Route path="/"             element={ <PrivateRoute> <Dashboard /> </PrivateRoute>} />
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;