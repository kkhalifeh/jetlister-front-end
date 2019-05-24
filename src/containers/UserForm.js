import React, { Component } from 'react'
import Cookies from 'js-cookie'

import { headers } from '../Helpers/http';

class UserForm extends Component {

  state = {
    signedIn: true,
    newUser: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      accepted: false
    },
    logInUser: {
      email: '',
      password: ''
    }
  }

  handleSignUp = (e) => {
    this.setState({
      newUser: { ...this.state.newUser, [e.target.name]: e.target.value }
    })
  }

  handleLogIn = (e) => {
    this.setState({
      logInUser: { ...this.state.logInUser, [e.target.name]: e.target.value }
    })
  }


  signUp = (e) => {
    const { newUser } = this.state;
    console.log(headers)

    e.preventDefault();
    fetch("http://localhost:3000/sign-up", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ 'sign_up': { ...newUser } }),
      headers,
      credentials: 'include'
    }).then(res => {
      Cookies.set('X-App-CSRF-Token', res.headers.get('X-App-CSRF-Token'));
      return res.json()
    })
      .then(response => {
        console.log('Success:', JSON.stringify(response.data))
      })
  }

  logIn = (e) => {
    const { logInUser } = this.state;
    console.log(headers)

    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ 'sign_in': { ...logInUser } }),
      headers,
      credentials: 'include'
    }).then(res => {
      Cookies.set('X-App-CSRF-Token', res.headers.get('X-App-CSRF-Token'));
      return res.json()
    })
      .then(response => {
        console.log('Success:', JSON.stringify(response))
      })
  }


  render() {
    if (this.state.signedIn) {
      return (
        <form className="ui form" onSubmit={this.logIn}>
          <div className="field">
            <label>Email</label>
            <input
              onChange={this.handleLogIn}
              type="text"
              name="email"
              placeholder="Email" />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              onChange={this.handleLogIn}
              type="password"
              name="password"
              placeholder="Password" />
          </div>
          <button
            className="ui button"
            type="submit">Sign In</button>
        </form>
      )

    } else {
      return (
        <form className="ui form" onSubmit={this.signUp}>
          <div className="field">
            <label>Username</label>
            <input
              onChange={this.handleSignUp}
              value={this.state.newUser.username}
              type="text"
              name="username"
              placeholder="Username" />
          </div>
          <div className="field">
            <label>First Name</label>
            <input
              onChange={this.handleSignUp}
              value={this.state.newUser.first_name}
              type="text"
              name="first_name"
              placeholder="First Name" />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              onChange={this.handleSignUp}
              value={this.state.newUser.last_name}
              type="text"
              name="last_name"
              placeholder="Last Name" />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              onChange={this.handleSignUp}
              value={this.state.newUser.email}
              type="text"
              name="email"
              placeholder="Email" />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              onChange={this.handleSignUp}
              value={this.state.newUser.password}
              type="password"
              name="password"
              placeholder="Password" />
          </div>
          <div className="field">
            <label>Password Confirmation</label>
            <input
              onChange={this.handleSignUp}
              value={this.state.newUser.password_confirmation}
              type="password"
              name="password_confirmation"
              placeholder="Password" />
          </div>
          <div className="field">
            <div className="ui checkbox">
              <input
                onChange={this.handleSignUp}
                value={this.state.newUser.accepted}
                type="checkbox"
                tabIndex="0"
                className="hidden" />
              <label>I agree to the Terms and Conditions</label>
            </div>
          </div>
          <button
            className="ui button"
            type="submit">Submit</button>
        </form>
      )

    }

  }
}

export default UserForm