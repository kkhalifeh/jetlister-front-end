import React, { Component } from 'react'
import MainListContainer from './MainListContainer';

class MyListContainer extends Component {

  state = {
    places: []
  }

  render() {
    const lists = [...this.props.lists]
    return (
      <div className="ui segment">
        {lists.map(list => {
          return <MainListContainer list={list} places={list.places} />
        })}
      </div>
    )
  }
}

export default MyListContainer
