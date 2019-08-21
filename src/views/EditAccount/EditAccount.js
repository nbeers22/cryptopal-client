import React from 'react'
import EditAccountForm from '../../components/EditAccountForm/EditAccountForm.js';

const EditAccount = () => {
  return(
    <section className="EditAccount">
      <div className="container">
        <div className="intro">
          <h1>Edit Account</h1>
          <p className="intro-subhead">You can update your name and password here. If you want to update your password, make sure you have your old password handy, as you cannot change your password without it.</p>
        </div>
        <EditAccountForm />
      </div>
    </section>
  )
}

export default EditAccount;