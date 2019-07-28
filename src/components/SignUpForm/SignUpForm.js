import React, { Component } from 'react'
import './SignUpForm.css'

export default class SignUpForm extends Component {
  render() {
    return (
      <section className="SignUpForm">
        <div className="container">
          <h1>Sign Up</h1>
          <form className="form">
            <div className="form-group">
              <label htmlFor="#name">Name</label>
              <input id="name" className="form-input" type="text" name="name" />
            </div>
            <div className="form-group">
              <label htmlFor="#email">Email</label>
              <input id="email" className="form-input" type="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="#password">Password</label>
              <input id="password" className="form-input" type="password" name="password" />
            </div>
            <div className="form-group">
              <label htmlFor="#confirm">Confirm Password</label>
              <input id="confirm" className="form-input" type="password" name="confirm" />
            </div>
            <div className="form-group">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </section>
    )
  }
}
