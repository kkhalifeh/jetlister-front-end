import React, { Component } from 'react'

class UserProfileCard extends Component {

  render() {
    return (
      <div className="ui cards">
        <div className="card">
          <div className="ui medium circular left floated image">
            <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" />
          </div>
          <div className="content">
            <div className="header">{this.props.data.first_name} {this.props.data.last_name}</div>
            <div className="meta">
              <a>{this.props.data.username}</a>
            </div>
            <div className="description">
              Matthew is an interior designer living in New York.
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
