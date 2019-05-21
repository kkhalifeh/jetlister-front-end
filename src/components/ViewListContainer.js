import React, { Component } from 'react'
import PlaceCardView from '../containers/PlaceCardView';
import GoogleAutoComplete from '../containers/GoogleAutoComplete';

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
                note={notes.filter(note => note.place_id === place.id)}
                editMode={this.props.editMode}
                editNote={this.props.editNote}
                removePlace={this.props.removePlace}
              />
            )
          })}
        </div>
        {this.props.editMode ? <div className="extra"> <div className="ui segment">
          <GoogleAutoComplete addPlace={this.props.addPlace} />
        </div> </div> : null}
        {this.props.editMode ? <div className="extra"> <div
          className="ui positive bottom attached button"
          onClick={(e) => this.props.saveList(e)}>
          Save
      </div> </div> : null}
      </div>
    )
  }
}

export default ViewListContainer
