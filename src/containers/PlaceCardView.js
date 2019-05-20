import React, { Component } from 'react'
const API_KEY = "AIzaSyC2-olvvVJYlu-5DZZ-EGKMoQ_zZGI3qyg"

class PlaceCardView extends Component {

  state = {
    isFetching: true,
    placeData: {}
  }

  componentDidMount() {
    const { place } = this.props;
    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${place.google_id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        this.setState(() => {
          return {
            isFetching: false,
            placeData: {
              place_id: data.result.place_id,
              formatted_address: data.result.formatted_address,
              formatted_phone_number: data.result.formatted_phone_number,
              name: data.result.name,
              photo_ref: data.result.photos ? data.result.photos[0].photo_reference : null,
              location: data.result.geometry.location,
              website: data.result.website,
              rating: data.result.rating,
            }
          }
        })
      });
  }

  render() {
    const { isFetching, placeData } = this.state;

    if (isFetching) return (
      <div className="card">
        <div className="ui loading segment">
        </div>
      </div >);

    const { name, formatted_address, formatted_phone_number, website, place_id, photo_ref } = this.state.placeData;
    return (
      <div className="card">
        <div className="image">
          <img style={{ maxHeight: 163.13 }} src={`https://maps.googleapis.com/maps/api/place/photo?key=${API_KEY}&photoreference=${photo_ref}&maxwidth=400`} />
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
          {this.props.note.length > 0 ? this.props.note[0].note : null}
        </div>
      </div>
    )
  }
}

export default PlaceCardView
