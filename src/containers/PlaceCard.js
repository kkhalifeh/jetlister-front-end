import React, { Component } from 'react'
import CategorySelector from './CategorySelector';
const API_KEY = "AIzaSyC2-olvvVJYlu-5DZZ-EGKMoQ_zZGI3qyg"

class PlaceCard extends Component {

  state = {
    imgUrl: null
  }

  componentDidMount() {
    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?key=${API_KEY}&photoreference=${this.props.place.photo_ref}&maxwidth=400`, {
      method: 'GET',
    })
      .then(res => res.text())
      .then(text => this.setState({ imgUrl: text }))
  }

  render() {
    const { name, formatted_address, formatted_phone_number, website, place_id, note } = this.props.place
    return (
      <div className="card">
        <div className="image">
          <img style={{ maxHeight: 163.13 }} src={`https://maps.googleapis.com/maps/api/place/photo?key=${API_KEY}&photoreference=${this.props.place.photo_ref}&maxwidth=400`} />
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
          <CategorySelector selectCategory={(e) => this.props.selectCategory(e, place_id)} />
        </div>
        <div className="extra">
          <div className="ui form">
            <input
              type="text"
              value={note}
              placeholder="Comments"
              onChange={(e) => this.props.addNote(e, place_id)} />
          </div>
        </div>
        <div className="ui negative bottom attached button" onClick={(e) => this.props.removePlace(e, place_id)}>
          <i className="minus icon" ></i>
          Remove
      </div>
      </div>
    )
  }
}

export default PlaceCard
