'use client'
import React, { useRef } from 'react'
import { Location } from '../search/LocationSearch';
import { Loader } from "@googlemaps/js-api-loader"
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Skeleton } from '@mantine/core';
import { JsonValue } from '@prisma/client/runtime/library';
import BackButton from '../BackButton';

interface InstitutionMapParams {
    buildings: {
        id: string; 
        name: string;
        location: JsonValue;
        alias: string; 
        description: string; 
        address: string; 
        openHours: JsonValue; 
        facilities: string[]; 
        institutionId: string;
    }[];
    onMarkerClick: (buildingId: string) => void;
    topView?: boolean;
}

const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute'
}

const options = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
}

const InstitutionMap = ({
    buildings,
    onMarkerClick,
    topView
}:InstitutionMapParams) => {

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ['places']
    })

    // keeps reference to map obj without re-rendering component upon every interaction
    const mapRef = useRef<google.maps.Map | null>(null);

    const onLoad = (map: google.maps.Map) => {
        mapRef.current = map;

        // Initializes Lat Lng Bounds
        const bounds = new window.google.maps.LatLngBounds();
        buildings.forEach(({ location }) => {
            bounds.extend({ 
                // @ts-ignore
                lat: location?.latitude, 
                // @ts-ignore
                lng: location?.longitude
            })
        });
        map.fitBounds(bounds);
        map.setZoom(14);
        
    }


    // use onUnmount as cleanup function
    const onUnmount = () => {
        mapRef.current = null;
    };

    if (loadError) {
        return <div>Error loading maps</div>
    }

  return (
    <div 
    className={`
        ${topView ? 
            'absolute top-0 h-[20rem] w-full'
            : 
            'fixed min-h-[90%] min-w-[40%] max-w-[50%] z-0 right-0'}
        `}>
    {isLoaded ? (
    <GoogleMap 
        // @ts-ignore
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
    >
        {buildings.map((building) => (
            <Marker 
                key={building.id}
                position={{
                    // @ts-ignore
                    lat: building.location?.latitude,
                    // @ts-ignore
                    lng: building.location?.longitude
                }}
                onClick={() => onMarkerClick(building.id)}
            />
        ))}
    </GoogleMap>
  ) : (
    <Skeleton 
        width="100%"
        height="100%"
    />
  )}
  </div>
  )

}

export default InstitutionMap