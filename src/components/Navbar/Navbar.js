import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return(
    <nav>
      <div className="top-bar-left">
        <Link to="/"><img src="" alt="Logo"/></Link>
      </div>
      <div className="top-bar-right">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="#!">Link</a></li>
          <li><a href="#!">Link</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;