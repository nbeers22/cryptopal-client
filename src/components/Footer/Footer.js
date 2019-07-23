import React from 'react';
// import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const date = new Date();

  return(
    <footer className="footer">
      <p>Copyright &copy;{date.getFullYear()}</p>
    </footer>
  )
}

export default Footer;