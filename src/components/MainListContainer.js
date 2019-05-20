import React, { Component } from 'react'
import PlaceCard from '../containers/PlaceCard';

class MainListContainer extends Component {
  render() {
    const places = [...this.props.places]
    return (
      <div className="ui container" >
        <div className='ui cards'>
          {places.map(place => {
            return (
              <div>
                <PlaceCard
                  selectCategory={this.props.selectCategory}
                  addNote={this.props.addNote}
                  place={place}
                  key={place.place_id}
                  removePlace={this.props.removePlace} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default MainListContainer
