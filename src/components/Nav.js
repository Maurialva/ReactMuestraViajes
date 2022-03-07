import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
 
    return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
      <Link to="/" className="navbar-brand">Inicio</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
           <Link to="/Viajes" className="nav-link active">Viajes</Link>
          </li>
        </ul>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
           <Link to="/Choferes" className="nav-link active">Choferes</Link>
          </li>
        </ul>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
           <Link to="/Clientes" className="nav-link active">Clientes</Link>
          </li>
        </ul>
        </div>         
        </div>
    </nav>
    );
}

export default Nav;
