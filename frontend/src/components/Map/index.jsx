import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import React from 'react'

const Map = ({ selectedLocation }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCuIRAANPCL3pO1Om36BUID9m5JysB4Of8"
    })

    const mapRef = React.useRef();

    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])
    if (loadError) return "Error";
    if (!isLoaded) return "Maps";

    return (
        <>
            <GoogleMap mapContainerStyle={{ height: "800px" }} center={selectedLocation} zoom={15} onLoad={onMapLoad}>
                <MarkerF position={selectedLocation} icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"} />
            </GoogleMap>
        </>
    )
}

export default Map