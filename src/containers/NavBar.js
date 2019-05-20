import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class NavBar extends Component {


  render() {
    return (
      <div className="ui inverted menu">
        <Link to='/dashboard' name='dashboard' className="item">Home</Link>
        <Link to='/new-list' name='new-list' className="item">Create List</Link>
        <Link to='/my-lists' name='my-lists' className="item">My Lists</Link>

        <div className="right menu">
          <div className="item">
            <div className="ui icon input">
              <input type="text" placeholder="Search..." />
              <i className="search link icon"></i>
            </div>
          </div>
          <a className="ui item" href="/">
            Logout
          </a>
        </div>
      </div>
    )
  }
}

export default NavBar