import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  let navbarItems;

  if(window.localStorage.getItem('cryptopal-client-auth-token')){
    navbarItems = 
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/account">Account</Link></li>
      </ul>
  }else{
    navbarItems = 
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/login">Sign in</Link></li>
      </ul>
  }

  return(
    <nav>
      <div className="top-bar-left">
        <Link to="/"><img src="" alt="Logo"/></Link>
      </div>
      <div className="top-bar-right">
        {navbarItems}
      </div>
    </nav>
  )
}

export default Navbar;