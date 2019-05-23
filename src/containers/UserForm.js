import React, { Component } from 'react'

class UserForm extends Component {

  state = {
    signedIn: true
  }
  render() {
    if (this.state.signedIn) {
      return (
        <form class="ui form">
          <div class="field">
            <label>Username</label>
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div class="field">
            <label>Password</label>
            <input type="text" name="password" placeholder="Password" />
          </div>
          <button class="ui button" type="submit">Sign In</button>
        </form>
      )

    } else {
      return (
        <form className="ui form">
          <div className="field">
            <label>Username</label>
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div className="field">
            <label>First Name</label>
            <input type="text" name="first-name" placeholder="First Name" />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input type="text" name="last-name" placeholder="Last Name" />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" name="email" placeholder="Email" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="text" name="password" placeholder="Password" />
          </div>
          <div className="field">
            <div className="ui checkbox">
              <input type="checkbox" tabindex="0" className="hidden" />
              <label>I agree to the Terms and Conditions</label>
            </div>
          </div>
          <button className="ui button" type="submit">Submit</button>
        </form>
      )

    }

  }
}

export default UserForm