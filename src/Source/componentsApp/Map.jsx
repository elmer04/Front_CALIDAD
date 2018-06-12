import  React from  'react'
import {withScriptjs, withGoogleMap,InfoWindow , GoogleMap, Marker } from "react-google-maps"
import { compose, withProps } from "recompose"

const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `1000%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
    )(({lat=-12.0803712,lng=-77.0981714,nombre='feik',onMarkerClick,zoom=15,...props}) =>

        <GoogleMap
            defaultZoom={zoom}
             defaultCenter={{lat: lat, lng: lng}}
        >
            {props.isMarkerShown &&
            <Marker
                position={{lat: lat, lng: lng}}
                onClick={onMarkerClick}
            >
                <InfoWindow onCloseClick ={props.onToggleOpen}>
                    <div>
                        {nombre}

                    </div>
                </InfoWindow>
            </Marker>}
            
        </GoogleMap>
    )

export default Map
