'use client'
import { JsonValue } from '@prisma/client/runtime/library'
import React from 'react'
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api'
import Heading from '../Heading'
import { Skeleton } from "@/components/ui/skeleton"

interface LocationDisplayProps {
    location: {
        lat: number;
        lng: number;
    },
    address?: string,
    name?: string,
}

const containerStyle = {
    width: '100%',
    height: '300px',
};

const options = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
}

const LocationDisplay = ({
    location,
    address,
    name
}:LocationDisplayProps) => {
    const { lat, lng } = location;
    const center = { lat, lng }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ['places'],
    })

    const [map, setMap] = React.useState<google.maps.Map | null>(null)

    const onLoadMap = React.useCallback((map: google.maps.Map) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, [center])

    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null)
    }, []);
     
  return (
    <div>
        <Heading 
            title="Location"
        />
        {address && (
        <div className="
            rounded-full
            border
            border-black
            px-4
            py-2
            my-2
            hover:shadow-md

        ">  
            <div className="text-sm text-neutral-600 overflow-x-auto">
                {name && <strong>{name}: </strong>} {address}
            </div>
        </div>
        )}
        {isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
                onLoad={onLoadMap}
                onUnmount={onUnmount}
                options={options}
            >
                <Marker position={center} />
            </GoogleMap>
        ) : (
            <Skeleton 
            className="
                h-[300px] 
                w-full 
                rounded-xl" />
        )
        }      
    </div>
  )
}

export default LocationDisplay