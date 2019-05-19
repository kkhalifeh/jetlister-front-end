import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import NavBar from './containers/NavBar';
import ListFormContainer from './containers/ListFormContainer';
import Dashboard from './containers/Dashboard';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <br />
        <div className="ui center aligned container">
          <Switch>
            <Route path='/dashboard' render={(routeProps) => <Dashboard {...routeProps} />} />
            <Route path='/new-list' render={(routeProps) => <ListFormContainer {...routeProps} />} />
          </Switch>
        </div>
        <br />
        Footer
      </div>
    )
  }
}

export default App
