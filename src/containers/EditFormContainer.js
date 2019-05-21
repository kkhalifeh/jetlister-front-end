import React, { Component } from 'react'
import ViewListContainer from '../components/ViewListContainer';

class EditFormContainer extends Component {
  render() {
    const places = [...this.props.list.places]
    const notes = [...this.props.list.place_categories]
    return (
      <div>
        <div className="ui labeled button" onClick={(e) => this.props.cancelEdit(e)}>
          <div className="ui button">
            <i className="times icon"></i> Cancel
          </div>
        </div>
        <ViewListContainer
          places={places}
          notes={notes}
          editMode={this.props.editMode}
          editNote={this.props.editNote}
          removePlace={this.props.removePlace}
          addPlace={this.props.addPlace}
          saveList = {this.props.saveList} />
      </div>
    )
  }
}

export default EditFormContainer
