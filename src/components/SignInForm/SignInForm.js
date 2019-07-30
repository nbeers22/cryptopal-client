import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import FlashMessage from '../FlashMessage/FlashMessage.js';
import config from '../../config.js';
import TokenService from '../../services/token-service.js';

class SignInForm extends Component {

  state = {
    email: '',
    password: '',
    showFlashMessage: false,
    flashMessage: '',
    submitError: false,

  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    }
    const url = `${config.API_URL}/auth/login`;
    fetch(url,{
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user)
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
        TokenService.saveAuthData(data)
        this.props.history.push("/dashboard");
      }
    })
    .catch( response => {
      console.log(response)
      this.setState({ 
        submitError: true,
        showFlashMessage: true,
        flashMessage: 'There was a problem logging in'
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
            <h1>Sign In</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam quisquam fugiat quae expedita, vero distinctio non quo error eveniet repellat illo qui id facilis aliquam itaque veritatis magni. Quisquam, fugiat!</p>
          </div>
          <form className="form" onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="#email">Email</label>
              <input id="email" className="form-input" type="email" name="email" onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="#password">Password</label>
              <input id="password" className="form-input" type="password" name="password" onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <input type="submit" value="Submit" />
            </div>
          </form>
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </section>
    )
  }
}

export default withRouter(SignInForm);