import React, { Component } from 'react'


class NavBar extends Component {


  render() {
    return (
      <div className="ui inverted menu">
        <a name='dashboard' className="item" href="dashboard">
          Home
        </a>
        <a name='new-list' className="item" href="new-list">
          Create List
         </a>
        <a className="item" href="/">
          My Lists
        </a>
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