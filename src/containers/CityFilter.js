import React, { Component } from 'react'
import Select from 'react-select';

class CityFilter extends Component {
  state = {
    locations_filter: []
  }

  componentDidMount() {
    fetch('/locations_filter')
      .then(res => res.json())
      .then(data => {
        this.setState({ locations_filter: data })
      })
  }
  render() {
    return (
      <Select
        placeholder='Filter city'
        defaultValue=''
        options={this.state.locations_filter}
        onChange={(e) => this.props.cityFilter(e)}
        getOptionLabel={(option) => option.city}
        getOptionValue={(option) => option.id}
      />
    )
  }
}

export default CityFilter
