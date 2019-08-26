import React from 'react'
import SignInForm from '../../components/SignInForm/SignInForm.js'

function SignIn(){
  document.title = "Sign in to your CryptoPal account"
  return(
    <SignInForm />
  )
}

export default SignIn;