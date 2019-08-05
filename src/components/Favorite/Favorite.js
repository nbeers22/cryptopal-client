import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import './Favorite.css'

const Favorite = props => {
  const { rank, logo, name, price, change24hr, id, marketCap } = props;
  let arrow, color;
  if(+change24hr > 0){
    arrow = faLongArrowAltUp
    color = "green"
  }else{
    arrow = faLongArrowAltDown
    color = "red"
  }

  return (
    <div className="Favorite">
      <h2>{ name }</h2>
      <h3>${ price }</h3>
      <p className={color}>%{ change24hr } <FontAwesomeIcon icon={arrow} /></p>
    </div>
  )
}

export default Favorite;