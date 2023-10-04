import React, { useEffect } from 'react';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { validateToken } from './helpers';

const NotFound = () => {

  useEffect(() => {
    const checkToken = async () => {
      const token = await validateToken();
    };
    checkToken();
  }, []);

  return (
    <div>
      <NavBar />
      
      <div className="container d-flex align-items-center" style={{ minHeight: '100vh', textalign: 'center!important' }}>
        <div className="row justify-content-center  col-12">
          <div className="col-8 offset-2">
            <h1 className="display-6" style={{ fontSize: '3rem' }}>404 - Página não encontrada</h1>
            <p className="lead" style={{ fontSize: '1.5rem' }}>A página que você está procurando não foi encontrada.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
