import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class NavBar extends Component {

  searchUser = (e) => {
    console.log(e.target.value);

  }



  render() {
    return (
      <div className="ui inverted menu">
        <Link to='/dashboard' name='dashboard' className="item">Home</Link>
        <Link to='/new-list' name='new-list' className="item">Create List</Link>
        <Link to='/my-lists' name='my-lists' className="item">My Lists</Link>
        <Link to='/all-lists' name='all-lists' className="item">All Lists</Link>

        <div className="right menu">
          <div className="item">
            <div className="ui icon input">
              <input type="text" placeholder="Search..." onChange={this.searchUser} />
              <i className="search link icon"></i>
            </div>
          </div>
          {/* <a className="ui item" href="/">
            Logout
          </a> */}
          <Link to='/user-form' name='user-form' className="item">Sign Up</Link>
        </div>
      </div>
    )
  }
}

export default NavBar