import React from 'react';
import Logo from '../img/Logo.png';
import LogoutButton from './LogoutButton';

function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <img id="Logo" src={Logo} alt="Logo" className="align-left" />
        <a className="navbar-brand" id="title-nav" href={process.env.PUBLIC_URL + '/'}> Home </a>
        <div className="navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="navbar-text mr-3" style={{ marginRight:'20px' }}>
                <span style={{ fontWeight:'bold' }}>{
                localStorage.getItem('usuario_nome')
              } </span> <span style={{ fontStyle:'italic'}}> { localStorage.getItem('usuario_departamento')} </span></span>
            </li>
            <li className="nav-item">
              <LogoutButton />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
