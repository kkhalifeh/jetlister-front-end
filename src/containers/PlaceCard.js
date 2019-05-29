import React, { Component } from 'react'
import CategorySelector from './CategorySelector';
import StarRatingComponent from 'react-star-rating-component';
const API_KEY = "AIzaSyC2-olvvVJYlu-5DZZ-EGKMoQ_zZGI3qyg"

class PlaceCard extends Component {

  render() {
    const { name, formatted_address, formatted_phone_number, website, place_id, note, rating } = this.props.place
    return (
      <div className="card">
        <div className="image">
          <img style={{ maxHeight: 163.13 }} src={`https://maps.googleapis.com/maps/api/place/photo?key=${API_KEY}&photoreference=${this.props.place.photo_ref}&maxwidth=400`} />
        </div>
        <div className="content" >
          <div className="header">{name}</div>
          <a href={website} target="_blank" ><div className="meta" style={{ overflow: "hidden" }} >{website}</div></a>
          <a href={` http://maps.google.com/?q=${formatted_address}`} target="_blank">
            <div className="description" >
              {formatted_address}
            </div>
          </a>
        </div>
        <div className="extra">
          Google Rating:
          <div>
            <StarRatingComponent value={rating} name={name} />
            <br />
            {rating}
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
