import React, { Component } from 'react'
import Cookies from 'js-cookie'
import headers from '../Helpers/http';
import auth from "./auth";

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
      .then(data => console.log(data))
      .catch(data => {
        console.log(data)
      });
  }

  logIn = (e) => {
    e.preventDefault();
    const { from } = this.props.location;
    const { logInUser } = this.state;
    fetch("/login", {
      headers: headers(Cookies.get("X-App-CSRF-Token")),
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ 'sign_in': { ...logInUser } })
    })
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then(data => {
        auth.login(data, () => {
          const redirectTo = from ? from.pathname : "/";
          this.props.history.push(redirectTo);
        })
      })
      .catch(data => {
        console.log(data)
      });
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