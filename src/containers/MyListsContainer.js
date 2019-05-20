import React, { Component } from 'react'
import ViewListContainer from '../components/ViewListContainer';
import PinnedListsContainer from './PinnedListsContainer';

class MyListsContainer extends Component {
  state = {
    userLists: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/lists')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(() => {
          return { userLists: [...data] }
        })
      })
  }
  render() {
    const { userLists } = this.state;
    return (
      <div className="ui segment" style={{ borderColor: (255, 255, 255) }}>
        {userLists.map(list => {
          return (
            <div className="ui segment" key={list.id}>
              <h4>{list.location.city}, {list.location.country}</h4>
              <ViewListContainer
                list={list}
                places={list.places}
                notes={list.place_categories} />
            </div>)
        })}
        <br />
        <PinnedListsContainer />
      </div>
    )
  }
}

export default MyListsContainer