import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import FullListsContainer from './FullListsContainer';

class Dashboard extends Component {

  state = {
    cities: null,
    selectedCity: null
  }

  componentDidMount() {
    fetch('/locations_filter')
      .then(res => res.json())
      .then(data => {
        this.setState({ cities: data })
      })
  }

  handleClick = () => {
    return <Link to="/all-lists" />
  }

  cityRender = (e, id) => {
    const cities = [...this.state.cities]
    // debugger
    const selected = cities.find(city => city.id === id)
    this.setState({ selectedCity: selected })
  }


  render() {
    const { cities } = this.state

    if (this.state.selectedCity) {
      return (
        <div className="ui center aligned container">
          <FullListsContainer city={this.state.selectedCity} />
        </div >
      )

    } else {
      return (
        <div>
          <img className="ui fluid image" src="https://i.ibb.co/B3cZ8Rm/Screen-Shot-2019-05-28-at-3-04-03-PM.png"></img>
          <br />
          {this.state.cities ? <div className="ui center aligned container">
            <div className="ui four stackable cards">
              {cities.map(city => {
                return (
                  <div className="card" key={city.id} onClick={(e) => this.cityRender(e, city.id)} >
                    <img src={process.env.PUBLIC_URL + `/${city.id}.png`} alt="" style={{ height: 200 }} />
                    <h2>{city.city}</h2>
                    <br />
                  </div>
                )
              })}
            </div>
          </div> : null}
        </div>
      )

    }

  }
}

export default Dashboard
