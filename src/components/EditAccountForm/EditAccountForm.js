import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './EditAccountForm.css'
import EditAccountName from './EditAccountName';
import EditAccountPassword from './EditAccountPassword';
import config from '../../config.js'
import TokenService from '../../services/token-service.js'
import FlashMessage from '../FlashMessage/FlashMessage.js';

class EditAccountForm extends Component {

  state = {
    name: '',
    newPassword: '',
    confirmPassword: '',
    oldPassword: '',
    submitError: false,
    showFlashMessage: false,
    flashMessage: ''
  }

  inputChange = (field, value) => {
    this.setState({ [field]: value });
  }

  submitForm = () => {
    const { name, newPassword, oldPassword } = this.state;
    const userData = {
      name,
      newPassword,
      oldPassword
    }
    const userID = TokenService.getAuthUserID();
    const userToken = TokenService.getAuthToken();
    const url = `${config.API_URL}/users/${userID}`;

    fetch(url,{
      method: "PATCH",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(userData)
    })
    .then( response => {
      return response.ok
        ? response.json()
        : console.log(response)
    })
    .then( data => {
      let error;
      if(data.name){
        TokenService.saveName(data)
      }
      if(!data){
        this.setState({
          showFlashMessage: true,
          flashMessage: "Something went wrong. Please try again.",
          submitError: true
        })
      }else{
        let message;
        if(data.name)
          message = "Name updated successfully!"
        if(data.password)
          message = "Password updated successfully!"
        if(data.error){
          message = data.error
          error = true;
        }

        this.setState({
          showFlashMessage: true,
          flashMessage: message,
          submitError: error
        }, () => this.props.history.push('/account') )
      }
    })
  }

  render() {
    const { flashMessage, showFlashMessage, submitError } = this.state;

    return (
      <div className="EditAccountForm">
        { showFlashMessage 
          && <FlashMessage
                message={flashMessage}
                error={submitError}
                login={false}
              /> 
        }
        <EditAccountName
          inputChange={this.inputChange}
          submitForm={this.submitForm}
        />
        <EditAccountPassword
          inputChange={this.inputChange}
          submitForm={this.submitForm}
        />
      </div>
    )
  }
}

export default withRouter(EditAccountForm);