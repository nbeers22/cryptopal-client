import React from 'react'
import { Link } from 'react-router-dom'
import './FlashMessage.css'

function FlashMessage(props){

  return(
    <div className="FlashMessage">
      { props.message } <Link to="/login">log in</Link>
    </div>
  )
}

export default FlashMessage;