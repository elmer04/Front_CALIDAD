import React, { PureComponent } from 'react'
import Map from './Map'

class MapContainer extends React.PureComponent {
    state = {
      isMarkerShown: false,
      zoom:15,
    }
  
    componentDidMount() {
      this.delayedShowMarker()
    }
  
    delayedShowMarker = () => {
      setTimeout(() => {
        this.setState({ isMarkerShown: true })
      }, 3000)
    }
  
    handleMarkerClick = () => {
      this.setState({ zoom: 17 })
    }
  
    render() {
      return (
        <Map lat={-12.069654} lng={-77.1636127} nombre='la feik' isMarkerShown={this.state.isMarkerShown} zoom={this.state.zoom} onMarkerClick={this.handleMarkerClick}/>
      )
    }
  }

  export default MapContainer;