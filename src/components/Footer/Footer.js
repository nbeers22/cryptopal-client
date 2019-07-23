import React from 'react';
// import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const date = new Date();

  return(
    <footer className="footer">
      <div className="container">
        <p>Copyright &copy;{date.getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer;