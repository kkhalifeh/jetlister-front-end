import React, { Component } from 'react'
import ViewListContainer from '../components/ViewListContainer';
import PinnedListsContainer from './PinnedListsContainer';
import EditFormContainer from './EditFormContainer';
const API_KEY = "AIzaSyC2-olvvVJYlu-5DZZ-EGKMoQ_zZGI3qyg"

class MyListsContainer extends Component {
  state = {
    userLists: [],
    editMode: null,
    editList: null
  }

  componentDidMount() {
    this.renderUserLists()
  }

  renderUserLists = () => {
    fetch('http://localhost:3000/lists')
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return { userLists: [...data] }
        })
      })
  }

  componentWillMount() {
    this.setState({ editMode: false })
  }

  editList = (e, id) => {
    console.log(e);
    console.log(id);
    e.preventDefault()
    const userLists = [...this.state.userLists]
    const list = userLists.filter(list => list.id === id)
    this.setState({ editMode: true, editList: list[0] })
  }

  cancelEdit = (e) => {
    e.preventDefault()
    this.setState({ editMode: false, editList: null }, this.renderUserLists())
  }

  editNote = (e, id) => {
    console.log(e.target.value);
    console.log(id);
    const places = [...this.state.editList.place_categories]
    const foundPlace = places.find(place => place.place_id === id)
    const placeIdx = places.findIndex(place => place.place_id === id)
    foundPlace.note = e.target.value
    places[placeIdx] = foundPlace
    this.setState(prevState => ({
      editList: {
        ...prevState.editList,
        place_categories: places,
      },
    }))
  }

  removePlace = (e, id) => {
    console.log(this.state);
    e.preventDefault()
    const places = [...this.state.editList.places]
    const filteredPlaces = places.filter(place => place.id !== id)
    this.setState(prevState => ({
      editList: {
        ...prevState.editList,
        places: filteredPlaces,
      },
    }))
  }

  addPlace = (id) => {
    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        const place = { name: data.result.name, photo_ref: data.result.photos ? data.result.photos[0].photo_reference : null, google_id: data.result.place_id }
        fetch("http://localhost:3000/places/create", {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(place), // data can be `string` or {object}!
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(place => {
            console.log('Success:', JSON.stringify(place))
            const places = [...this.state.editList.places]
            places.push(place)
            this.setState(prevState => ({
              editList: {
                ...prevState.editList,
                places: places,
              },
            }))
          }
          )
      })
  }

  removeList = (e, id) => {
    e.preventDefault()
    const list = { id: id }
    fetch(`http://localhost:3000/lists/${id}/remove_author`, {
      method: 'PATCH', // or 'PUT'
      body: JSON.stringify(list), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.renderUserLists()
      })
  }


  saveList = (e) => {
    e.preventDefault()
    const list = { ...this.state.editList }
    fetch(`http://localhost:3000/lists/${this.state.editList.id}/edit`, {
      method: 'PATCH',
      body: JSON.stringify(list),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ editMode: false }, this.renderUserLists())
      })
  }

  render() {
    const { userLists } = this.state;
    if (this.state.editMode === false) {
      return (
        <div className="ui segment" style={{ borderColor: (255, 255, 255) }}>
          {userLists.map(list => {
            return (
              <div className="ui segment" key={list.id}>
                <div className="ui labeled button" onClick={(e) => this.editList(e, list.id)}>
                  <div className="ui button">
                    <i className="pencil alternate icon"></i> Edit List
                  </div>
                </div>
                <div className="ui labeled button" onClick={(e) => this.removeList(e, list.id)}>
                  <div className="ui red button">
                    <i className="window close icon"></i> Delete List
                  </div>
                </div>
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
    } else {
      return (
        <div className="ui segment">
          <EditFormContainer
            cancelEdit={this.cancelEdit}
            list={this.state.editList}
            editMode={this.state.editMode}
            editNote={this.editNote}
            removePlace={this.removePlace}
            addPlace={this.addPlace}
            saveList={this.saveList} />
        </div>
      )
    }
  }
}

export default MyListsContainer