import React, { Component } from 'react'
import ViewListContainer from '../components/ViewListContainer';
import CityFilter from './CityFilter';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import headers from '../Helpers/http'

class FullListsContainer extends Component {

  state = {
    allLists: [],
    filteredLists: [],
    filter: false,
    selecteduser: {},
    reset: false
  }

  componentDidMount() {
    this.renderAllLists()
  }

  filteredLists = () => {
    // const allLists = { ...this.state }
    // const filteredLists = allLists.allLists.filter(list => list.location.id === this.props.city.id)
    if (this.props.city) {
      this.setState({ filter: true })
    }
  }

  renderAllLists() {
    fetch('/all_lists')
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return { allLists: [...data] }
        }, this.filteredLists())
      })
  }

  reset = (e) => {
    e.preventDefault()
    this.setState({ reset: false }, this.renderAllLists())
  }


  pinList = (e, id) => {
    const pin = { list_id: id }
    e.preventDefault()
    fetch("/pins/create", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(pin), // data can be `string` or {object}!
      headers: headers(Cookies.get("X-App-CSRF-Token")),
      credentials: "include"
    }).then(res => res.json())
      .then(response => this.renderAllLists())
  }

  cityFilter = (e) => {
    const allLists = { ...this.state }
    const filteredLists = allLists.allLists.filter(list => list.location.id === e.id)
    this.setState({ allLists: filteredLists, reset: true })
  }

  selectUser = (e, id) => {
    this.setState({ selecteduser: id })
  }


  render() {
    const { allLists } = this.state;
    if (this.state.filter) {
      const filteredLists = allLists.filter(list => list.location.id === this.props.city.id)
      return (
        <div className="ui segment" style={{ marginTop: 25 }}>
          {filteredLists.map(list => {
            return (
              <div className="ui segment" key={list.id}>
                <div className="ui inverted segment">
                  <h3>{list.location.city}, {list.location.country}</h3>
                  <h4 className="ui header">
                    <img src="https://semantic-ui.com/images/avatar2/large/patrick.png" className="ui circular image" />
                    {list.author.username}
                  </h4>
                  <Link to={`/${list.author.id}`} name='user' className="ui button" onClick={(e) => this.selectUser(e, list.author.id)}>Select User</Link>
                </div>
                <ViewListContainer
                  list={list}
                  places={list.places}
                  notes={list.place_categories} />
                <br />
                <div className="ui labeled button" onClick={(e) => this.pinList(e, list.id)}>
                  <div className="ui black button">
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

    } else {
      return (
        <div className="ui segment" style={{ marginTop: 25 }}>

          {this.state.reset ? <div className="ui labeled button" onClick={(e) => this.reset(e)}>
            <div className="ui black button">
              <i className="thumbtack icon"></i> Reset Filter
                  </div>
          </div> : <CityFilter cityFilter={this.cityFilter} />}
          {allLists.map(list => {
            return (
              <div className="ui segment" key={list.id}>
                <div className="ui inverted segment">
                  <h3>{list.location.city}, {list.location.country}</h3>
                  <h4 className="ui header">
                    <img src="https://semantic-ui.com/images/avatar2/large/patrick.png" className="ui circular image" />
                    {list.author.username}
                  </h4>
                  <Link to={`/${list.author.id}`} name='user' className="ui button" onClick={(e) => this.selectUser(e, list.author.id)}>Select User</Link>
                </div>
                <ViewListContainer
                  list={list}
                  places={list.places}
                  notes={list.place_categories} />
                <br />
                <div className="ui labeled button" onClick={(e) => this.pinList(e, list.id)}>
                  <div className="ui black button">
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

export default FullListsContainer
