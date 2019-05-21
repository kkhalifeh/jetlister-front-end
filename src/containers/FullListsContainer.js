import React, { Component } from 'react'
import ViewListContainer from '../components/ViewListContainer';
import CityFilter from './CityFilter';
import { Link, Redirect } from 'react-router-dom';

class FullListsContainer extends Component {

  state = {
    allLists: [],
    filteredLists: [],
    filter: false,
    selecteduser: {}
  }

  componentDidMount() {
    this.renderAllLists()
  }

  renderAllLists() {
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
      .then(response => this.renderAllLists())
  }

  cityFilter = (e) => {
    console.log(e.id)
    const allLists = { ...this.state }
    console.log(allLists)
    const filteredLists = allLists.allLists.filter(list => list.location.id === e.id)
    this.setState({ allLists: filteredLists })
  }

  selectUser = (e, id) => {
    console.log(e)
    console.log(id)
    this.setState({ selecteduser: id })
  }


  render() {
    const { allLists } = this.state;
    const { filteredLists } = this.state

    return (
      <div className="ui segment">
        <CityFilter cityFilter={this.cityFilter} />
        {allLists.map(list => {
          return (
            <div className="ui segment" key={list.id}>
              <h4>{list.location.city}, {list.location.country}</h4>
              <h4>{list.author.username}</h4>
              <Link to={`/${list.author.id}`} name='user' className="ui button" onClick={(e) => this.selectUser(e, list.author.id)}>Select User</Link>
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
