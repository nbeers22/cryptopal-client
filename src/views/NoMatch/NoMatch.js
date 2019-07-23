import React from 'react'
import { Link } from 'react-router-dom'

function NoMatch(){
  return(
    <div className="NoMatch">
      <h1>404</h1>
      <Link to="/">
        Go Home
      </Link>
    </div>
  )
}

export default NoMatch;