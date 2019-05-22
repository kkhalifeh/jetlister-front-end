import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div><i className="flag checkered red icon"></i>{text}</div>;

class GoogleMap extends Component {

  state = {
    locations: [],
    isLoading: true
  }

  componentDidMount() {
    console.log(this.props);
    const locations = [...this.props.userLists]
    let userMap = []
    locations.forEach(location => userMap.push(location.location))
    this.setState({ locations: userMap, isLoading: false })
  }

  static defaultProps = {
    center: {
      lat: 49.6330582,
      lng: -20.4216851
    },
    zoom: 0
  };

  render() {
    if (this.state.isLoading === false) {
      const locations = [...this.state.locations]
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '100%' }}>
          <GoogleMapReact
            // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {locations.map(location => {
              return <AnyReactComponent
                lat={location.latitude}
                lng={location.longitude}
                text={location.city}
              />
            })}
            {/* <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            /> */}
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