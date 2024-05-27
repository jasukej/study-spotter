'use client'


import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import { useEffect } from 'react';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default mergeOptions({
    IconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src
})

interface MapProps {
    center?: number[]
}

const SearchControl = ({ provider }) => {
    const map = useMap();

    useEffect(() => {
        const searchControl = new GeoSearchControl({
            provider,
            style: 'bar',
            showMarker: true,
            showPopup: false,
            marker: {
                icon: new L.Icon.Default(),
                draggable: false,
            },
            maxMarkers: 1,
            retainZoomLevel: false,
            animateZoom: true,
            autoClose: true,
            searchLabel: 'Enter address',
            keepResult: true,
        });

        map.addControl(searchControl);

        return () => map.removeControl(searchControl);
    }, [map, provider]);

    return null;
};

const Map = ({ center }:MapProps) => {
  return (
    <MapContainer
        center = {center as L.LatLngExpression }
        zoom = {center ? 4 : 2}
        scrollWheelZoom={false}
        className="h-[35vh] rounded-lg"
    >
         <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <SearchControl provider={provider} />
            {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  )
}

export default Map