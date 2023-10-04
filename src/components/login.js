import React from 'react';
import Logo from '../img/Logo.png';
import './login.css';

import LoginForm from '../components/LoginForm';
const Login = (props) => {
  return (
    <div className='container-geral'>
      <div className='container-login'>
        <div className='logo-container mt-120'>
          <div className='brand-logo-circle bg-t' >
          <div className='brand-logo-circle bg-in' >
            <img src={Logo} alt='Logo da Empresa' className='brand-logo logo-linea' />
          </div>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
