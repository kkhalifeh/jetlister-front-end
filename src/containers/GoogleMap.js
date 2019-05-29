import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import uuid from "uuid";

const AnyReactComponent = ({ text }) => <div><img src="https://cdn0.iconfinder.com/data/icons/map-3/1024/pin-512.png" style={{ width: 20 }} />{text}</div>;

class GoogleMap extends Component {

  state = {
    locations: [],
    isLoading: true
  }

  componentDidMount() {
    const locations = [...this.props.userLists]
    let userMap = []
    locations.forEach(location => userMap.push(location.location))
    this.setState({ locations: userMap, isLoading: false })
  }

  static defaultProps = {
    center: {
      lat: 30.939567,
      lng: -39.980321
    },
    zoom: 1
  };

  render() {
    if (this.state.isLoading === false) {
      const locations = [...this.state.locations]
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '100%' }}>
          <GoogleMapReact
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {locations.map(location => {
              return <AnyReactComponent
                key={uuid.v4()}
                lat={location.latitude}
                lng={location.longitude}
                text={location.city}
              />
            })}
          </GoogleMapReact>
        </div>
      );

    } else {
      return (
        <div className="ui segment loading">

        </div>
      )

    }

  }
}

export default GoogleMap;