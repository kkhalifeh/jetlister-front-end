import React, { Component } from 'react'
import Suggestions from '../components/Suggestions'
const API_URL = 'http://localhost:3000/users'

class UserSearch extends Component {
  state = {
    query: '',
    results: []
  }

  getInfo = () => {
    fetch(`${API_URL}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          results: data
        })
      })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
      }
    })
  }

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    )
  }
}

export default UserSearch

