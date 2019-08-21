import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

const Trophy = props => {
  const { rank } = props
  let trophyColor
  switch (rank) {
    case 1:
      trophyColor = "gold"
      break;
    case 2:
      trophyColor = "silver"
      break;
    case 3:
      trophyColor = "bronze"
      break;
    default:
      trophyColor = undefined
  }
  return (
    <span className="Trophy">
      <FontAwesomeIcon
        icon={faTrophy}
        className={trophyColor}
      />
    </span>
  )
}

export default Trophy