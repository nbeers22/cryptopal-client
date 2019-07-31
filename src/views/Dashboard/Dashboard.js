import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TokenService from '../../services/token-service';

export default class Dashboard extends Component {

  constructor(){
    super();
    this.state = {
      loggedIn: false
    }
    const token = TokenService.getAuthToken();
    if(token){
      this.setState({ login: true })
    }
  }

  render() {
    if(!this.state.loggedIn){
      return <Redirect to="/login" />
    }
    return (
      <div>
        Welcome, this is your dashboard
      </div>
    )
  }
}
