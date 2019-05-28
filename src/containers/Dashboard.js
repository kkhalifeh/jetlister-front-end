import React, { Component } from 'react'
import UserSearch from './UserSearch';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <img className="ui fluid image" src="https://i.ibb.co/B3cZ8Rm/Screen-Shot-2019-05-28-at-3-04-03-PM.png"></img>
        <br />
        <div className="ui center aligned container">
          <div className="ui three stackable cards">
            <div className="card">
              <div className="image">
                <img src="https://i.ibb.co/THjC1tx/New-York.png" />
              </div>
            </div>
            <div className="card">
              <div className="image">
                <img src="https://i.ibb.co/dJBfZxM/Dubai.png" />
              </div>
            </div>
            <div className="card">
              <div className="image">
                <img src="https://i.ibb.co/N9sswnm/Mykonos.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
