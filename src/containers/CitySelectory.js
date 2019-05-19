import React, { Component } from 'react'
import Select from 'react-select';

class CitySelector extends Component {

  state = {
    locations: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/locations')
      .then(res => res.json())
      .then(data => {
        this.setState({ locations: data })
      })
  }

  render() {
    return (
      <Select
        placeholder='Select city'
        defaultValue=''
        options={this.state.locations}
        onChange={(e) => this.props.citySelector(e)}
        getOptionLabel={(option) => option.city}
        getOptionValue={(option) => option.id}
      />
    )
  }
}

export default CitySelector

