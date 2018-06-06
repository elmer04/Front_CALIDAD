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
    )((props) =>
        <GoogleMap
            defaultZoom={15}
             defaultCenter={{lat: -12.053232, lng: -77.085899}}
        >

            {props.isMarkerShown &&
            <Marker
                position={{lat: -12.053232, lng: -77.085899}}
                onClick={props.onToggleOpen}
            >
                <InfoWindow onCloseClick ={props.onToggleOpen}>
                    <div>
                        {"San Marcos"}

                    </div>
                </InfoWindow>
            </Marker>
            }
        </GoogleMap>
    )

    export default Map
