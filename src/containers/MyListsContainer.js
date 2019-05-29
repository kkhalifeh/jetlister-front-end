import React, { Component } from 'react'
import ViewListContainer from '../components/ViewListContainer';
import PinnedListsContainer from './PinnedListsContainer';
import EditFormContainer from './EditFormContainer';
import UserProfileCard from './UserProfileCard';
import Cookies from 'js-cookie'
import headers from '../Helpers/http'
import GoogleMap from './GoogleMap';
const API_KEY = "AIzaSyC2-olvvVJYlu-5DZZ-EGKMoQ_zZGI3qyg"
const CORS_LINK = "https://warm-anchorage-35403.herokuapp.com/"
const CORS_EVERYWHERE = "https://cors-anywhere.herokuapp.com/"

class MyListsContainer extends Component {
  state = {
    userLists: [],
    editMode: null,
    editList: null,
    userData: null
  }

  componentDidMount() {
    this.renderUserLists()
    this.renderUserinfo()
  }

  renderUserLists = () => {
    fetch('/lists')
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return { userLists: [...data] }
        })
      })
  }

  renderUserinfo = () => {
    fetch('/users/my_info')
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return { userData: { data } }
        })
      })

  }


  componentWillMount() {
    this.setState({ editMode: false })
  }

  editList = (e, id) => {
    e.preventDefault()
    const userLists = [...this.state.userLists]
    const list = userLists.filter(list => list.id === id)
    this.setState({ editMode: true, editList: list[0] })
  }

  cancelEdit = (e) => {
    e.preventDefault()
    this.setState({ editMode: false, editList: null }, this.renderUserLists())
  }

  editNote = (e, id) => {
    const places = [...this.state.editList.list_places]
    const foundPlace = places.find(place => place.place_id === id)
    const placeIdx = places.findIndex(place => place.place_id === id)
    // debugger
    foundPlace.note = e.target.value
    places[placeIdx] = foundPlace
    this.setState(prevState => ({
      editList: {
        ...prevState.editList,
        list_places: places,
      },
    }))
  }

  removePlace = (e, id) => {
    e.preventDefault()
    const places = [...this.state.editList.places]
    const filteredPlaces = places.filter(place => place.id !== id)
    this.setState(prevState => ({
      editList: {
        ...prevState.editList,
        places: filteredPlaces,
      },
    }))
  }

  addPlace = (id) => {
    fetch(`${CORS_LINK}https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        const place = { name: data.result.name, photo_ref: data.result.photos ? data.result.photos[0].photo_reference : null, google_id: data.result.place_id }
        fetch("/places/create", {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(place), // data can be `string` or {object}!
          headers: headers(Cookies.get("X-App-CSRF-Token")),
          credentials: "include"
        }).then(res => res.json())
          .then(place => {
            console.log('Success:', JSON.stringify(place))
            const places = [...this.state.editList.places]
            places.push(place)
            this.setState(prevState => ({
              editList: {
                ...prevState.editList,
                places: places,
              },
            }))
          }
          )
      })
  }

  removeList = (e, id) => {
    e.preventDefault()
    const list = { id: id }
    fetch(`/lists/${id}/remove_author`, {
      method: 'PATCH', // or 'PUT'
      body: JSON.stringify(list), // data can be `string` or {object}!
      headers: headers(Cookies.get("X-App-CSRF-Token")),
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        this.renderUserLists()
      })
  }


  saveList = (e) => {
    e.preventDefault()
    const list = { ...this.state.editList }
    fetch(`/lists/${this.state.editList.id}/edit`, {
      method: 'PATCH',
      body: JSON.stringify(list),
      headers: headers(Cookies.get("X-App-CSRF-Token")),
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ editMode: false }, this.renderUserLists())
      })
  }

  render() {
    const { userLists } = this.state;
    if (this.state.editMode === false) {
      return (
        <div className="ui segment" style={{ marginTop: 25 }}>
          {this.state.userData ? <UserProfileCard data={this.state.userData.data} lists={this.state.userLists.length > 0 ? this.state.userLists.length : null} /> : null}
          {this.state.userLists.length > 0 ? <div><div className="ui segment"><GoogleMap userLists={this.state.userLists} /> </div> <div className="ui inverted segment"> <h3>My Lists</h3> </div> </div> : null}
          {userLists.map(list => {
            return (
              <div className="ui segment" key={list.id}>
                <h4>{list.location.city}, {list.location.country}</h4>
                <div className="ui buttons">
                  <button className="ui button" onClick={(e) => this.editList(e, list.id)}>Edit</button>
                  <div className="or"></div>
                  <button className="ui negative button" onClick={(e) => this.removeList(e, list.id)}>Delete</button>
                </div>
                <br />
                <br />
                <ViewListContainer
                  list={list}
                  places={list.places}
                  notes={list.list_places} />
              </div>
            )
          })}
          <br />
          <PinnedListsContainer />
        </div>
      )
    } else {
      return (
        <div className="ui segment">
          <EditFormContainer
            cancelEdit={this.cancelEdit}
            list={this.state.editList}
            editMode={this.state.editMode}
            editNote={this.editNote}
            removePlace={this.removePlace}
            addPlace={this.addPlace}
            saveList={this.saveList} />
        </div>
      )
    }
  }
}

export default MyListsContainer