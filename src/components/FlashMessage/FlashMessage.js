import React from 'react'
import { Link } from 'react-router-dom'
import './FlashMessage.css'

function FlashMessage(props){

  return(
    <div className={"FlashMessage" + (props.error ? " error" : " success")}>
      { props.message } { !props.error && props.login && <Link to="/login">log in</Link>}
    </div>
  )
}

export default FlashMessage;