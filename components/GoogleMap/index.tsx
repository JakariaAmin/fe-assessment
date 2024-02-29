'use client'

import React from "react";
import {GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";
import {useAppSelector} from "@/stores/hooks";

const containerStyle = {
  width       : '100%',
  minHeight   : '75vh',
  marginTop   : '16px',
  marginBottom: '20px',
  borderRadius: '8px',
};

const GoogleMapContainer = () => {
  const {isLoaded} = useJsApiLoader(
    {
      id              : "google-map-script",
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY ?? '',
    })

  const [_, setMap] = React.useState(null);

  // Select data from the Redux store using useSelector.
  const {selected} = useAppSelector((state) => state.placeAutocomplete);

  const onLoad = React.useCallback(function callback(map: any) {
    const center = new window.google.maps.LatLng(selected.coordinates);
    map.setCenter(center);

    setMap(map);
  }, [selected.coordinates])

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle = {containerStyle}
      center = {selected.coordinates}
      zoom = {14}
      onLoad = {onLoad}
      onUnmount = {onUnmount}
    >
      <MarkerF position = {selected.coordinates}/>
    </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMapContainer)
