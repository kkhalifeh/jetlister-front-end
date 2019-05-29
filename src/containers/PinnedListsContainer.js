import React, { Component } from 'react'
import ViewListContainer from '../components/ViewListContainer';
import Cookies from 'js-cookie'
import headers from '../Helpers/http'

class PinnedListsContainer extends Component {

  state = {
    pinnnedLists: []
  }

  componentDidMount() {
    this.renderPinLists()
  }

  renderPinLists = () => {
    fetch('/pins')
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return { pinnnedLists: [...data] }
        })
      })
  }


  removePin = (e, id) => {
    e.preventDefault()
    const pin = { id: id }
    fetch(`/pins/${id}/delete`, {
      method: 'DELETE', // or 'PUT'
      body: JSON.stringify(pin), // data can be `string` or {object}!
      headers: headers(Cookies.get("X-App-CSRF-Token")),
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        this.renderPinLists()
      })
  }

  render() {
    const { pinnnedLists } = this.state;
    if (pinnnedLists.length > 0) {
      return (
        <div className="ui segment">
          <div className="ui inverted segment">
            <h3>Pinned Lists</h3>
          </div>
          {pinnnedLists.map(list => {
            return (
              <div className="ui segment" key={list.id}>
                <div className="ui labeled button" onClick={(e) => this.removePin(e, list.id)}>
                  <div className="ui black button">
                    <i className="thumbtack icon"></i> unPin
                  </div>
                </div>
                <h4>{list.list.location.city}, {list.list.location.country}</h4>
                <h4>User: {list.list.author.first_name} {list.list.author.last_name}</h4>
                <ViewListContainer
                  list={list.list}
                  places={list.list.places}
                  notes={list.list.place_categories} />
              </div>
            )
          })}
        </div>
      )

    } else {
      return null
    }

  }
}

export default PinnedListsContainer