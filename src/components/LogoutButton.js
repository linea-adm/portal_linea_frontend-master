import React from 'react';
import { Button } from 'react-bootstrap';

const LogoutButton = () => {

  const handleLogout = () => {
    // Limpar o token do local storage ou do estado do aplicativo, se necessário
    localStorage.removeItem('token');
    // Redirecionar para a página de login ou outra página desejada
    window.location.href = process.env.PUBLIC_URL + '/login';
  };

  return (
    <Button variant="danger" style={{ marginRight:'30px' }} onClick={handleLogout}>Sair</Button>
  );
};

export default LogoutButton;
