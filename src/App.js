import React, { Component } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './containers/NavBar';
import ListFormContainer from './containers/ListFormContainer';
import Dashboard from './containers/Dashboard';
import MyListsContainer from './containers/MyListsContainer'
import FullListsContainer from './containers/FullListsContainer';

class App extends Component {

  state = {
    currentuser: 31
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
