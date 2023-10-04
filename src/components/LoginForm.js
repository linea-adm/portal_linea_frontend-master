import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';


const LoginForm = () => {
  const [samaccountname, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL_LOGIN, {
        samaccountname,
        password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        const response2 = await fetch(process.env.REACT_APP_API_URL_DADOS_USUARIO, {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        }).then((result) => {

          result.json().then((data) => {

            localStorage.setItem('usuario_nome', data.primeiro_nome);
            localStorage.setItem('usuario_departamento',data.departamento );

          });
        });

        const redirectURL = sessionStorage.getItem('redirectURL');

        if (redirectURL) {
          sessionStorage.removeItem('redirectURL');
          window.location.href = redirectURL;
        } else {
          window.location.href = process.env.PUBLIC_URL + "/";
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setError("Credenciais inválidas. Por favor, verifique seu usuário e senha.");
      } else {
        setError("Erro na comunicação com o servidor");
      }
      // setError(error);
      // setError("Erro na comunicação com o servidor");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group form-login">
          <label htmlFor="samaccountname"><b>Usuário</b></label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><FontAwesomeIcon icon={faUser} style={{ color: 'white' }} /></span>
            </div>
            <input
              className="form-control input-login"
              type="text"
              id="samaccountname"
              placeholder="Informe seu usuário"
              value={samaccountname}
              onChange={handleUsernameChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password"><b>Senha</b></label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><FontAwesomeIcon icon={faLock} style={{ color: 'white' }} /></span>
            </div>
            <input
              className="form-control input-login"
              type="password"
              id="password"
              placeholder='Digite sua senha'
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        {error && <p className="alert alert-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">LOGIN</button>
      </form>
    </div>
  );
};

export default LoginForm;
