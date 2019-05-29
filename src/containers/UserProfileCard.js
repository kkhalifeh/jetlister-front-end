import React, { Component } from 'react'

class UserProfileCard extends Component {

  render() {
    return (
      <div className="ui cards">
        <div className="card" style={{ width: "-webkit-fill-available" }}>
          <div className="content" style={{ textAlign: "-webkit-left" }}>
            <div className="ui small circular left floated image">
              <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" />
            </div>
            <br />
            <div className="header">{this.props.data.first_name} {this.props.data.last_name}</div>
            <div className="meta">
              <a>{this.props.data.username}</a>
            </div>
            <br />
            <div className="meta">
              <p>About</p>
            </div>
          </div>
          <div className="extra content">
            <span>
              <i className="globe icon"></i>
              {this.props.lists} Lists
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfileCard
