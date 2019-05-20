import React, { Component } from 'react'
import ViewListContainer from '../components/ViewListContainer';

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
      <div className="ui segment">
        {userLists.map(list => {
          return (<div className="ui segment"> <h4>{list.location.city}, {list.location.country}</h4> <ViewListContainer list={list} places={list.places} notes={list.place_categories} key={list.id} /> </div>)
        })}
      </div>
    )
  }
}

export default MyListsContainer