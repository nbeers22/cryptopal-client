import React, { Component } from 'react'
import FormError from '../FormError/FormError.js'

export default class EditAccountName extends Component {

  state = {
    name: '',
    hasError: false,
    errorMessage: 'Name cannot be blank'
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value },
      () => this.props.inputChange(name, this.state.name)
    )
  }

  handleFormSubmit = event => {
    event.preventDefault();
    !this.state.name 
      ? this.setState({ hasError: true })
      : this.props.submitForm()
  }

  render() {
    const { hasError, errorMessage } = this.state;

    return (
      <form className="form EditAccountName" onSubmit={this.handleFormSubmit}>
        <h3>Update Name</h3>
        <div className="form-group">
          <label htmlFor="#name">Name</label>
          <input id="name" className="form-input" type="text" name="name" onChange={this.handleInputChange} />
          { hasError && <FormError errorMessage={errorMessage} /> }
        </div>
        <div className="form-group">
          <input id="name-submit" className="btn-cta" type="submit" value="Update Name" />
        </div>
      </form>
    )
  }
}
