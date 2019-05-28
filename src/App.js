import React, { Component } from 'react'
import { Route, Switch, withRouter, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './containers/NavBar';
import ListFormContainer from './containers/ListFormContainer';
import Dashboard from './containers/Dashboard';
import MyListsContainer from './containers/MyListsContainer'
import FullListsContainer from './containers/FullListsContainer';
import UserProfile from './containers/UserProfile';
import UserForm from './containers/UserForm';
import Cookies from 'js-cookie'
import headers from './Helpers/http'
import auth from "./containers/auth";
import PrivateRoute from './containers/PrivateRoute';
import SignUp from './containers/SignUp';

class App extends Component {

  state = {
    currentuser: 33
  }

  componentDidMount() {
    fetch("/heartbit", {
      credentials: "include",
      headers: headers(Cookies.get("X-App-CSRF-Token"))
    }).then(resp => {
      return resp.json()
    }).then(data => console.log(data));
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <br />
          <Logout />
          <div className="ui center aligned container">
            <Switch>
              <PrivateRoute path='/' exact component={Dashboard} />
              <PrivateRoute path='/new-list' component={ListFormContainer} />
              <PrivateRoute path="/my-lists" component={MyListsContainer} />
              <PrivateRoute path="/all-lists" component={FullListsContainer} />
              <Route path="/user-form" component={UserForm} />
              <Route path="/sign-up" component={SignUp} />
              <PrivateRoute path="/:user" component={UserProfile} />
            </Switch>
          </div>
          <br />
          Footer
        </div>
      </Router>
    )
  }
}


const Logout = withRouter(({ history }) => {
  if (!auth.isAuthenticated()) return null;

  const logOut = e => {
    e.preventDefault();

    fetch('/logout', {
      headers: headers(Cookies.get("X-App-CSRF-Token")),
      credentials: "include",
      method: "DELETE"
    })
      .then(response => response.json())
      .then(data => {
        auth.logout(() => history.push("/"));
      });
  };

  return (
    <a href="/sign-out" onClick={logOut}>
      Log out
    </a>
  );
});

export default App
