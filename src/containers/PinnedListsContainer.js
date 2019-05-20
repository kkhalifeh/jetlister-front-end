import React, { Component } from 'react'
import ViewListContainer from '../components/ViewListContainer';

class PinnedListsContainer extends Component {

  state = {
    pinnnedLists: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/pins')
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return { pinnnedLists: [...data] }
        })
      })
  }

  render() {
    const { pinnnedLists } = this.state;
    return (
      <div className="ui segment">
        {pinnnedLists.map(list => {
          return (
            <div className="ui segment" key={list.id}>
              <h4>{list.list.location.city}, {list.list.location.country}</h4>
              <h4>User: {list.list.author.first_name} {list.list.author.last_name}</h4>
              <ViewListContainer
                list={list.list}
                places={list.list.places}
                notes={list.list.place_categories} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default PinnedListsContainer