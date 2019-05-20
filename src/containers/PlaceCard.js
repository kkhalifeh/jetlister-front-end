import React, { Component } from 'react'
import CategorySelector from './CategorySelector';
const API_KEY = "AIzaSyC2-olvvVJYlu-5DZZ-EGKMoQ_zZGI3qyg"

class PlaceCard extends Component {

  state = {
    place: {}
  }

  componentDidMount() {
    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${this.props.place.google_id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          place: {
            google_id: data.result.place_id,
            formatted_address: data.result.formatted_address,
            formatted_phone_number: data.result.formatted_phone_number,
            name: data.result.name,
            photo_ref: data.result.photos[0].photo_reference,
            location: data.result.geometry.location,
            website: data.result.website,
            rating: data.result.rating,
            category_id: null,
            note: ''
          }
        })
      })
  }

  render() {
    const { name, formatted_address, formatted_phone_number, website, google_id, note } = this.state.place
    return (
      <div className="card">
        <div className="image">
          <img style={{ maxHeight: 163.13 }} src={`https://maps.googleapis.com/maps/api/place/photo?key=${API_KEY}&photoreference=${this.state.place.photo_ref}&maxwidth=400`} />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="meta">{website}</div>
          <div className="description">
            {formatted_address}
            <br />
            {formatted_phone_number}
          </div>
        </div>
        <div className="extra">
          Rating:
       <div className="ui star rating" data-rating="4">
          </div>
        </div>
        <div className="extra">
          <CategorySelector selectCategory={(e) => this.props.selectCategory(e, google_id)} />
        </div>
        <div className="extra">
          <div className="ui form">
            <input
              type="text"
              value={note}
              placeholder="Comments"
              onChange={(e) => this.props.addNote(e, google_id)} />
          </div>
        </div>
        <div className="ui negative bottom attached button" onClick={(e) => this.props.removePlace(e, google_id)}>
          <i className="minus icon" ></i>
          Remove
      </div>
      </div>
    )
  }
}

export default PlaceCard
