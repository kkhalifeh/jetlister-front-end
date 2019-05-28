import React, { Component } from 'react'
import Cookies from 'js-cookie'
import headers from '../Helpers/http'
import { Route, Redirect } from 'react-router'

class SignUp extends Component {
  state = {
    newUser: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      accepted: false
    },
    toLogin: false
  }

  handleSignUp = (e) => {
    this.setState({
      newUser: { ...this.state.newUser, [e.target.name]: e.target.value }
    })
  }

  signUp = (e) => {
    e.preventDefault();
    const { newUser } = this.state;

    fetch("/sign-up", {
      headers: headers(Cookies.get("X-App-CSRF-Token")),
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ 'sign_up': { ...newUser } })
    })
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then(data => {
        this.setState({ toLogin: true })

      })
      .catch(data => {
        console.log(data)
      });
  }

  render() {
    if (this.state.toLogin === false) {
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
    } else {
      return (
        <Redirect to="/user-form" />
      )

    }

  }
}

export default SignUp