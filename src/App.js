import React from 'react';
import Login from "./components/login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Analytics from './components/Analytics';
import Home from './components/home';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/analitics/estoque/:codigo/:quantidade" element={<Analytics/>} />
        <Route  path="*" element={<NotFound/>} />
      </Routes>
    </Router>
    
  );
};

export default App;
