import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import NavBar from './containers/NavBar';
import ListFormContainer from './containers/ListFormContainer';
import Dashboard from './containers/Dashboard';
import MainListContainer from './components/MainListContainer';
import MyListContainer from './components/MyListContainer';
const API_KEY = "AIzaSyC2-olvvVJYlu-5DZZ-EGKMoQ_zZGI3qyg"

class App extends Component {

  state = {
    userlists: [],
    currentuser: 31
  }

  componentDidMount() {
    fetch('http://localhost:3000/lists')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const userlists = data.filter(list => list.author_id === this.state.currentuser)
        this.setState({ ...this.state.userlists, userlists: userlists })
        // userlists.forEach(list => {
        //   list.places.forEach(place => {
        //     fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${place.google_id}`, {
        //       method: 'GET',
        //     })
        //       .then(response => response.json())
        //       .then(data => {
        //         debugger
        //         this.setState({
        //           places: [...this.state.places, {
        //             place_id: data.result.place_id,
        //             formatted_address: data.result.formatted_address,
        //             formatted_phone_number: data.result.formatted_phone_number,
        //             name: data.result.name,
        //             photo_ref: data.result.photos[0].photo_reference,
        //             location: data.result.geometry.location,
        //             website: data.result.website,
        //             rating: data.result.rating,
        //             category_id: null,
        //             note: ''
        //           }]
        //         })
        //       });
        // })
        // });
      })
  }

  render() {
    return (
      <div>
        <NavBar />
        <br />
        <div className="ui center aligned container">
          <Switch>
            <Route path='/dashboard' render={(routeProps) => <Dashboard {...routeProps} />} />
            <Route path='/new-list' render={(routeProps) => <ListFormContainer {...routeProps} />} />
            <Route path='/my-lists' render={(routeProps) => <MyListContainer {...routeProps} lists={this.state.userlists} />} />
          </Switch>
        </div>
        <br />
        Footer
      </div>
    )
  }
}

export default App
