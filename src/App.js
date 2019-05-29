import React, { Component } from 'react'
import { Route, Switch, withRouter, Link, BrowserRouter as Router } from 'react-router-dom';
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
import FilteredContainer from './containers/FilteredContainer'

class App extends Component {

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
          <Logout />
          <PrivateRoute path='/' exact component={Dashboard} />
          <div className="ui center aligned container">
            <Switch>
              <PrivateRoute path='/new-list' component={ListFormContainer} />
              <PrivateRoute path="/my-lists" component={MyListsContainer} />
              <PrivateRoute path="/all-lists" component={FullListsContainer} />
              <PrivateRoute path="/filtered-list" component={FilteredContainer} />
              <Route path="/user-form" component={UserForm} />
              <Route path="/sign-up" component={SignUp} />
              <PrivateRoute path="/:user" component={UserProfile} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}


const Logout = withRouter(({ history }) => {
  if (!auth.isAuthenticated()) return <NavBar />;

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
    <div className="ui inverted menu" style={{ margin: 0 }}>
      {/* <Link to='/' name='home' className="item">Home</Link> */}
      <img src={process.env.PUBLIC_URL + `/JL2-01_small.png`} alt="" className="item" style={{ backgroundColor: "white" }} />
      <Link to='/all-lists' name='all-lists' className="item">Explore</Link>
      <Link to='/new-list' name='new-list' className="item">Create List</Link>
      <Link to='/my-lists' name='my-lists' className="item">My Profile</Link>


      <div className="right menu">
        <a href="/sign-out" onClick={logOut} className="item">Log Out</a>
      </div>
    </div>
  )
});

export default App
