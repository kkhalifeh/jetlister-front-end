import React, { Component } from 'react'
import ViewListContainer from '../components/ViewListContainer';
import UserProfileCard from './UserProfileCard';
import Cookies from 'js-cookie'
import headers from '../Helpers/http'

class UserProfile extends Component {

  state = {
    slecteduser: false,
    userLists: null
  }

  componentDidMount() {
    this.renderUserLists()
  }

  renderUserLists = () => {
    const { user } = this.props.match.params
    fetch(`/lists/${parseInt(user)}/user_lists`)
      .then(res => res.json())
      .then(data => {
        this.setState({ slecteduser: true, userLists: data })
      })
  }

  addPin = (e, id) => {
    const pin = { list_id: id }
    e.preventDefault()
    fetch("/pins/create", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(pin), // data can be `string` or {object}!
      headers: headers(Cookies.get("X-App-CSRF-Token")),
      credentials: "include"
    }).then(res => res.json())
      .then(response => this.renderUserLists())
  }


  render() {
    const { userLists } = this.state;
    if (this.state.slecteduser === false) {
      return (
        <div className="ui loading segment">
        </div>
      )

    } else {
      return (
        <div className="ui segment">
          <UserProfileCard data={this.state.slecteduser ? this.state.userLists[0].author : null} lists={this.state.slecteduser ? this.state.userLists.length : null} />
          {userLists.map(list => {
            return (
              <div className="ui segment" key={list.id}>
                <h4>{list.location.city}, {list.location.country}</h4>
                <h4>{list.author.username}</h4>
                <ViewListContainer
                  list={list}
                  places={list.places}
                  notes={list.place_categories} />
                <div className="ui labeled button" onClick={(e) => this.addPin(e, list.id)}>
                  <div className="ui button">
                    <i className="thumbtack icon"></i> Pin List
                </div>
                  <a className="ui basic label">
                    {list.pins.length}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )

    }

  }
}

export default UserProfile
