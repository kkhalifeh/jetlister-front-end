import React, { Component } from 'react'
import CitySelector from './CitySelectory';
import GoogleAutoComplete from './GoogleAutoComplete';
import MainListContainer from '../components/MainListContainer';
const API_KEY = "AIzaSyC2-olvvVJYlu-5DZZ-EGKMoQ_zZGI3qyg"

class ListFormContainer extends Component {

  state = {
    places: [],
    location_id: null,
    currentuser: 35
  }

  addPlace = (id) => {
    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          places: [...this.state.places, {
            place_id: data.result.place_id,
            formatted_address: data.result.formatted_address,
            formatted_phone_number: data.result.formatted_phone_number,
            name: data.result.name,
            photo_ref: data.result.photos ? data.result.photos[0].photo_reference : null,
            location: data.result.geometry.location,
            website: data.result.website,
            rating: data.result.rating,
            category_id: null,
            note: ''
          }]
        })
      });
  }

  citySelector = (e) => {
    this.setState({ location_id: e.id })
  }

  removePlace = (e, id) => {
    e.preventDefault()
    const places = [...this.state.places]
    const idx = places.findIndex(place => place.place_id === id)
    this.setState((prevState) => ({
      places: [...prevState.places.slice(0, idx), ...prevState.places.slice(idx + 1)]
    }))
  }

  addNote = (e, id) => {
    const places = [...this.state.places]
    const foundPlace = places.find(place => place.place_id === id)
    const placeIdx = places.findIndex(place => place.place_id === id)
    foundPlace.note = e.target.value
    places[placeIdx] = foundPlace
    this.setState({ places: places })
  }

  selectCategory = (e, id) => {
    const places = [...this.state.places]
    const foundPlace = places.find(place => place.place_id === id)
    const placeIdx = places.findIndex(place => place.place_id === id)
    foundPlace.category_id = e.id
    places[placeIdx] = foundPlace
    this.setState({ places: places })
  }

  saveList = (e) => {
    e.preventDefault()
    const list = { ...this.state }
    e.preventDefault()
    fetch("http://localhost:3000/lists/create", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(list), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
  }

  render() {
    return (
      <div className="ui segments">
        <div className="ui segment">
          <CitySelector citySelector={this.citySelector} />
        </div>
        {this.state.places.length > 0 ?
          <div className="ui segment">
            <MainListContainer
              selectCategory={this.selectCategory}
              addNote={this.addNote}
              places={this.state.places}
              removePlace={this.removePlace} />
          </div>
          : null}
        <div className="ui segment">
          <GoogleAutoComplete addPlace={this.addPlace} />
        </div>
        <div
          className="ui positive bottom attached button"
          onClick={(e) => this.saveList(e)}>
          Save
      </div>
      </div>
    )
  }
}

export default ListFormContainer
