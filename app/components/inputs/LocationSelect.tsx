import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MdMyLocation } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { UseFormSetValue, FieldValues, UseFormRegister } from 'react-hook-form';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -34.397,
  lng: 150.644
};

const options = {
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
}

interface OpeningHours {
  [key: string]: string; // e.g., { "monday": "8:30 AM - 5:30 PM" }
}

interface Location {
  lat: number;
  lng: number;
}

interface LocationProps {
  onSelectLocation: (
    location: Location, 
    openHours: OpeningHours | null,
    address: string | null 
  ) => void;
  position: Location | null;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const LocationSelect = ({ 
  onSelectLocation, 
  position,
  required,
  register,
  setValue }:LocationProps) => {
  const [map, setMap] = useState<google.maps.Map>();
  const searchBoxRef = useRef<google.maps.places.SearchBox>();

  const formatOpeningHours = (weekdayText: string[]): OpeningHours => {
    const daysOfWeek = [
      "sunday", 
      "monday", 
      "tuesday", 
      "wednesday", 
      "thursday", 
      "friday", 
      "saturday"
    ];
  
    const openingHours: OpeningHours = {};
  
    weekdayText.forEach((text, index) => {
      const day = daysOfWeek[index];
      openingHours[day] = text.split(": ")[1]; // Extract time range
    });
  
    return openingHours;
  };

  const onLoad = useCallback((ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  }, []);

  const onPlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length) {
      const place = places[0]
      const address = place.formatted_address || null;
      const weekdayText = place.opening_hours?.weekday_text || [];
      const openHours = formatOpeningHours(weekdayText);
      const loc = place.geometry?.location;

      const newPosition = {
        lat: loc!.lat(),
        lng: loc!.lng()
      };

      console.log('Address:', address)
      console.log('Open hours:', openHours);

      onSelectLocation(newPosition, openHours, address);
      setValue('location', newPosition);

      if (map) {
        map.setCenter(newPosition);
        map.setZoom(15);
      }
    }
  };

  const onLoadMap = useCallback((map: google.maps.Map) => {
    setMap(map);
    if (position) {
      map.setCenter(position);
      map.setZoom(15);
    }
  }, [position]);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        onSelectLocation(newPos, null, null);
        setValue('location', newPos);
        map?.setCenter(newPos);
        map?.setZoom(15);
        // setInputValue("");
      }, () => {
        alert('Error: The Geolocation service failed.');
      });
    } else {
      alert('Error: Your browser doesn\'t support geolocation.');
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  useEffect(() => {
    register('location', { required: true });
  }, [register]);

  return (
    <div>
    {isLoaded &&
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position || center}
        zoom={10}
        onLoad={onLoadMap}
        options={options}
      >
        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <div 
            className="
            flex 
            mt-6 
            items-center 
            w-full"
          >
          <FaLocationDot
            size={16} />
          <input
            type="text"
            placeholder="Search places"
            className="
              box-border 
              border 
              border-transparent 
              w-[90%] 
              h-[10%]
              px-3 
              rounded-full 
              shadow-md 
              text-sm 
              outline-none 
              overflow-ellipsis 
              absolute 
              left-1/2 
              -translate-x-1/2
              focus:border-black"
            // value={inputValue}
            // onChange={(e) => setInputValue(e.target.value)}
          />
          </div>
        </StandaloneSearchBox>
        {position && <Marker position={position} />}
      </GoogleMap>}
    <button
    onClick={handleLocationClick}
    className="
      mt-4 
      text-neutral-500
      hover:underline
      hover:text-black
      w-full
      font-medium 
      py-1 
      px-2 
      rounded
    ">
      <div className="
        flex 
        gap-2 
        justify-left
        align-items">
        <div className="inline mr-2 mt-1" >
          <MdMyLocation />
        </div> 
          Use Your Location
      </div>
    </button>
  </div>
  );
};

export default LocationSelect;
