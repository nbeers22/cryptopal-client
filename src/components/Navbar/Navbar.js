import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import TokenService from '../../services/token-service';
import logo from './images/cents-logo.png'
import './Navbar.css';

function Navbar(props) {
  let navbarItems;
  const gravatarURL = TokenService.getAuthGravatar();
  const userName = TokenService.getAuthName();

  if(window.sessionStorage.getItem('cryptopal-client-auth-token')){
    navbarItems = 
      <ul>
        <li><a href="/account" aria-haspopup="true"><img src={ gravatarURL } alt={ userName } /> <span className="name">{ userName } <FontAwesomeIcon icon={faCaretDown} /></span></a>
          <ul className="dropdown" aria-label="submenu">
            <li><Link to="/coins">All Coins</Link></li>
            <li><Link to="/account">Account</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/logout" onClick={logout}>Logout</Link></li>
          </ul>
        </li>
      </ul>
  }else{
    navbarItems = 
      <ul>
        <li><Link to="/coins">All Coins</Link></li>
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/login">Sign in</Link></li>
      </ul>
  }

  function logout(event){
    event.preventDefault();
    TokenService.clearAuthData();
    props.history.push('/')
  }

  return(
    <nav role="navigation">
      <div className="container">
        <div className="top-bar-left">
          <Link to="/"><img src={logo} alt="Logo" className="nav-logo" /></Link>
        </div>
        <div className="top-bar-right">
          {navbarItems}
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Navbar);