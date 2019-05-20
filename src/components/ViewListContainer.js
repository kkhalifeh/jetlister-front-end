import React, { Component } from 'react'
import PlaceCardView from '../containers/PlaceCardView';

class ViewListContainer extends Component {
  render() {
    const places = [...this.props.places]
    const notes = [...this.props.notes]
    return (
      <div className="ui container" >
        <div className='ui cards'>
          {places.map(place => {
            return (
              <PlaceCardView
                place={place}
                key={place.id}
                note={notes.filter(note => note.place_id === place.id)} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default ViewListContainer
