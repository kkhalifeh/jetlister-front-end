import React, { Component } from 'react'
import ViewListContainer from '../components/ViewListContainer';

class UserProfile extends Component {

  state = {
    slecteduser: false,
    userLists: null
  }

  componentDidMount() {
    const { user } = this.props.match.params
    fetch(`http://localhost:3000/lists/${parseInt(user)}/user_lists`)
      .then(res => res.json())
      .then(data => {
        this.setState({ slecteduser: true, userLists: data })
      })
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
          {userLists.map(list => {
            return (
              <div className="ui segment" key={list.id}>
                <h4>{list.location.city}, {list.location.country}</h4>
                <h4>{list.author.username}</h4>
                <ViewListContainer
                  list={list}
                  places={list.places}
                  notes={list.place_categories} />
                <div className="ui labeled button" onClick={(e) => this.pinList(e, list.id)}>
                  <div className="ui button">
                    <i className="heart icon"></i> Pin List
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
