import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import FlashMessage from '../FlashMessage/FlashMessage.js';
import config from '../../config.js';
import './SignUpForm.css';

export default class SignUpForm extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    submitError: '',
    showFlashMessage: false,
    flashMessage: ''
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    }
    const url = `${config.API_URL}/auth/signup`;
    fetch(url,{
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser)
    })
    .then( response => response.json() )
    .then( data => {
      console.log(data);
      if(data.error){
        this.setState({
          showFlashMessage: true,
          flashMessage: data.error,
          submitError: true
        })
      }else{
        this.setState({
          showFlashMessage: true,
          flashMessage: 'Account created successfully! You may now '
        })
      }
    })
    .catch( response => {
      console.log(response.error)
      this.setState({ 
        submitError: true,
        showFlashMessage: true,
        flashMessage: 'There was a problem creating your account'
      })
    })
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { flashMessage, showFlashMessage, submitError } = this.state;
    return (
      <section className="SignUpForm">
        <div className="container">
        { showFlashMessage && <FlashMessage message={flashMessage} error={submitError} /> }
          <div className="page-meta">
            <h1>Sign Up</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam quisquam fugiat quae expedita, vero distinctio non quo error eveniet repellat illo qui id facilis aliquam itaque veritatis magni. Quisquam, fugiat!</p>
          </div>
          <form className="form" onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="#name">Name</label>
              <input id="name" className="form-input" type="text" name="name" onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="#email">Email</label>
              <input id="email" className="form-input" type="email" name="email" onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="#password">Password</label>
              <input id="password" className="form-input" type="password" name="password" onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="#confirm">Confirm Password</label>
              <input id="confirm" className="form-input" type="password" name="confirmPassword" onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <input type="submit" value="Submit" />
            </div>
          </form>
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </section>
    )
  }
}
