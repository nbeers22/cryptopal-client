import React from 'react'
import { Link } from 'react-router-dom'
import './Favorite.css'

const Favorite = props => {
  const { rank, logo, name, price, change24hr, id, marketCap } = props;

  return (
    <div className="Favorite">
      <h2>{ name }</h2>
    </div>
  )
}

export default Favorite;