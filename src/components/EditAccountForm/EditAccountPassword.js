import React, { Component } from 'react'
import FormError from '../FormError/FormError.js'

export default class EditAccountPassword extends Component {

  state = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    hasError: false,
    errorMessage: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value },
      () => this.props.inputChange(name, this.state[name])
    )
  }
  
  handleFormSubmit = event => {
    event.preventDefault();
    if(this.validateInput()){
      this.props.submitForm();
    }
  }
  
  validateInput(){
    const { newPassword, oldPassword, confirmPassword } = this.state;
    const passwordsObj = {
      confirmPassword,
      newPassword,
      oldPassword,
    }
    Object.keys(passwordsObj).forEach( key => {
      if(!passwordsObj[key]){
        this.setState({
          hasError: true,
          errorMessage: {
            [key]: 'Field cannot be blank'
          }
        }, () => false)
      }
    })
    if(newPassword !== confirmPassword){
      this.setState({
        hasError: true,
        errorMessage: {
          confirmPassword: "New and confirm passwords do not match"
        }
      }, () => false)
    }
    return true;
  }
  
  render() {
    const { hasError, errorMessage } = this.state;
    return (
      <form className="form EditAccountPassword" onSubmit={this.handleFormSubmit}>
        <h3>Update Password</h3>
        <div className="form-group">
          <label htmlFor="#old-password">Old Password</label>
          <input id="old-password" className="form-input" type="password" name="oldPassword" onChange={this.handleInputChange} />
          { hasError && <FormError errorMessage={errorMessage.oldPassword} /> }
        </div>
        <div className="form-group">
          <label htmlFor="#new-password">New Password</label>
          <input id="new-password" className="form-input" type="password" name="newPassword" onChange={this.handleInputChange} />
          { hasError && <FormError errorMessage={errorMessage.newPassword} /> }
        </div>
        <div className="form-group">
          <label htmlFor="#confirm">Confirm New Password</label>
          <input id="confirm" className="form-input" type="password" name="confirmPassword" onChange={this.handleInputChange} />
          { hasError && <FormError errorMessage={errorMessage.confirmPassword} /> }
        </div>
        <div className="form-group">
          <input id="password-submit" className="btn-cta" type="submit" value="Update Password" />
        </div>
      </form>
    )
  }
}
