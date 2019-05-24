import React, { Component } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './containers/NavBar';
import ListFormContainer from './containers/ListFormContainer';
import Dashboard from './containers/Dashboard';
import MyListsContainer from './containers/MyListsContainer'
import FullListsContainer from './containers/FullListsContainer';
import UserProfile from './containers/UserProfile';
import UserForm from './containers/UserForm';
import Cookies from 'js-cookie'

class App extends Component {

  state = {
    currentuser: 33
  }

  componentDidMount() {
    fetch('http://localhost:3000/heartbit', { credentials: 'include' })
      .then(res => {
        Cookies.set('X-App-CSRF-Token', res.headers.get('X-App-CSRF-Token'));
        return res.json()
      })
      .then((resp) => console.log(resp))
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <br />
          <div className="ui center aligned container">
            <Switch>
              <Route path='/dashboard' render={(routeProps) => <Dashboard {...routeProps} />} />
              <Route path='/new-list' render={(routeProps) => <ListFormContainer {...routeProps} />} />
              <Route path="/my-lists" render={(routeProps) => <MyListsContainer {...routeProps} />} />
              <Route path="/all-lists" render={(routeProps) => <FullListsContainer {...routeProps} />} />
              <Route path="/user-form" render={(routeProps) => <UserForm {...routeProps} />} />
              <Route path="/:user" render={(routeProps) => <UserProfile {...routeProps} />} />
            </Switch>
          </div>
          <br />
          Footer
        </div>
      </Router>
    )
  }
}

export default App
