import React, { useEffect } from 'react';
import NavBar from './NavBar';
import Menu from './menu';
import { validateToken } from './helpers';

function Home() {
  useEffect(() => {
    const checkToken = async () => {
      const token = await validateToken();
    };
    checkToken();
  }, []);

  return (

    <div>
      <div>
        <NavBar />
        <Menu />
      </div>

      <footer className="footer fixed-bottom">
        <p>&copy; 2023 Portal Linea Alimentos - Desenvolvido por TI Línea</p>
      </footer></div>
  );
}

export default Home;
