import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
  const token = localStorage.getItem('token');
  try{
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  } catch (err) {
    console.error('Erro ao decodificar o token:', err);
    return <Navigate to="/login" />;
  }
}
export default PrivateRoute;