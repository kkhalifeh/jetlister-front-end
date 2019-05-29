import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (
      <div className="ui inverted menu">
        <div className="right menu">
          <Link to='/user-form' name='user-form' className="item">Login</Link>
          <Link to='/sign-up' name='sign-up' className="item">Sign Up</Link>
        </div>
      </div>
    )
  }
}

export default NavBar