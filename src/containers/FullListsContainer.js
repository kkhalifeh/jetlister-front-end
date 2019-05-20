import React, { Component } from 'react'
import ViewListContainer from '../components/ViewListContainer';

class FullListsContainer extends Component {

  state = {
    allLists: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/all_lists')
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return { allLists: [...data] }
        })
      })
  }

  pinList = (e, id) => {
    const pin = { list_id: id }
    e.preventDefault()
    fetch("http://localhost:3000/pins/create", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(pin), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
  }


  render() {
    const { allLists } = this.state;
    return (
      <div className="ui segment">
        {allLists.map(list => {
          return (
            <div className="ui segment" key={list.id}>
              <h4>{list.location.city}, {list.location.country}</h4>
              <h4>User: {list.author.first_name} {list.author.last_name}</h4>
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

export default FullListsContainer
