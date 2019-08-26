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
  
  const logout = event => {
    event.preventDefault();
    TokenService.clearAuthData();
    props.history.push('/')
  }

  if(window.sessionStorage.getItem('cryptopal-client-auth-token')){
    navbarItems = 
      <ul>
        <li><a href="/account" aria-haspopup="true" aria-label="Account options"><img src={ gravatarURL } alt={ userName } /> <span className="name">{ userName } <FontAwesomeIcon icon={faCaretDown} /></span></a>
          <ul className="dropdown" aria-label="submenu">
            <li className="menu-item"><Link to="/coins" aria-label="All Coins">All Coins</Link></li>
            <li className="menu-item"><Link to="/account" aria-label="Account">Account</Link></li>
            <li className="menu-item"><Link to="/dashboard" aria-label="Dashboard">Dashboard</Link></li>
            <li className="menu-item"><Link to="/logout" aria-label="Logout" onClick={logout}>Logout</Link></li>
          </ul>
        </li>
      </ul>
  }else{
    navbarItems = 
      <ul aria-label="menu">
        <li className="menu-item"><Link to="/coins" aria-label="All coins">All Coins</Link></li>
        <li className="menu-item"><Link to="/signup" aria-label="Sign up">Sign up</Link></li>
        <li className="menu-item"><Link to="/login" aria-label="Sign in">Sign in</Link></li>
      </ul>
  }


  return(
    <nav role="navigation">
      <div className="container">
        <div className="top-bar-left">
          <Link to="/" aria-label="Home">
            <img src={logo} alt="CryptoPal Home" className="nav-logo" />
          </Link>
        </div>
        <div className="top-bar-right">
          {navbarItems}
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Navbar);