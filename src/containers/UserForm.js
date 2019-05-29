import React, { Component } from 'react'
import Cookies from 'js-cookie'
import headers from '../Helpers/http';
import auth from "./auth";
import { Link } from 'react-router-dom';

class UserForm extends Component {

  state = {
    logInUser: {
      email: '',
      password: ''
    }
  }


  handleLogIn = (e) => {
    this.setState({
      logInUser: { ...this.state.logInUser, [e.target.name]: e.target.value.replace(/\s/g, '') }
    })
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
    return (
      <div className="ui segments">
        <div className="ui segment">
          <img src={process.env.PUBLIC_URL + `/JL2-01.png`} alt="" style={{ width: 500 }} />
        </div>
        <div className="ui segment">
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
        </div>
      </div>
    )
  }
}

export default UserForm