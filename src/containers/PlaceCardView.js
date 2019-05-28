import React, { Component } from 'react'
const API_KEY = "AIzaSyC2-olvvVJYlu-5DZZ-EGKMoQ_zZGI3qyg"
const CORS_LINK = "https://warm-anchorage-35403.herokuapp.com/"
const CORS_EVERYWHERE = "https://cors-anywhere.herokuapp.com/"

class PlaceCardView extends Component {

  state = {
    isFetching: true,
    placeData: {}
  }

  componentDidMount() {
    const { place } = this.props;
    fetch(`${CORS_LINK}https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${place.google_id}`, {
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
        {this.props.editMode ? "Edit" : null}
        <div className="image">
          <img style={{ maxHeight: 163.13 }} src={`https://maps.googleapis.com/maps/api/place/photo?key=${API_KEY}&photoreference=${this.props.photo_ref ? this.props.photo_ref : photo_ref}&maxwidth=400`} />
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
        {/* <div className="extra">
          Rating:
       <div className="ui star rating" data-rating="4">
          </div>
        </div> */}
        <div className="extra">
          {!this.props.editMode ? this.props.note.length > 0 ? this.props.note[0].note : null :
            <div>
              {/* <div className="extra">
                <div className="ui form">
                  <input
                    type="text"
                    placeholder={this.props.note.length > 0 ? this.props.note[0].note : "Comments"}
                    onChange={(e) => this.props.editNote(e, this.props.place.id)}
                  />
                </div>
              </div> */}
              <div className="ui negative bottom attached button" onClick={(e) => this.props.removePlace(e, this.props.place.id)}>
                <i className="minus icon" ></i>
                Remove
              </div>
            </div>}
        </div>
      </div>
    )
  }
}

export default PlaceCardView
