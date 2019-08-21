import React from 'react'
import './FormError.css'

const FormError = props => {
  return(
    <div className="FormError">
      { props.errorMessage }
    </div>
  )
}

export default FormError;