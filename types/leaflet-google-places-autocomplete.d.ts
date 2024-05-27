declare module 'leaflet-google-places-autocomplete' {
    import * as L from 'leaflet';
  
    namespace Control {
      class GPlaceAutocomplete extends L.Control {
        constructor(options?: GPlaceAutocompleteOptions);
      }
    }
  
    interface GPlaceAutocompleteOptions extends L.ControlOptions {
      callback?: (place: google.maps.places.PlaceResult) => void;
      autocompleteOptions?: google.maps.places.AutocompleteOptions;
      placeholder?: string;
      collapsed_mode?: boolean;
      prepend?: boolean;
    }
  }
  