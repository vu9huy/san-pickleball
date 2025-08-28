"use client"

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  APIProvider, 
  Map, 
  Marker,
  useMapsLibrary,
  useMap
} from '@vis.gl/react-google-maps';
import styles from './MapLocationProvider.module.css';
import { globalConfig } from '@/config/globalConfig';

// Search component that uses Google Places API
const PlacesAutocomplete = ({ onPlaceSelect, value, onChange }) => {
  const map = useMap();
  const places = useMapsLibrary('places');
  const [sessionToken, setSessionToken] = useState();
  const [placesService, setPlacesService] = useState();
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (!places || !map) return;

    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setSessionToken(undefined);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue) => {
      if (!places || !inputValue) {
        setPredictions([]);
        return;
      }

      const request = {
        input: inputValue,
        sessionToken,
        fields: ['place_id', 'formatted_address', 'geometry', 'name']
      };

      const autocompleteService = new places.AutocompleteService();
      try {
        const response = await autocompleteService.getPlacePredictions(request);
        setPredictions(response.predictions || []);
      } catch (error) {
        console.error('Error fetching predictions:', error);
        setPredictions([]);
      }
    },
    [places, sessionToken]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(value);
    fetchPredictions(value);
    setShowPredictions(true);
  };

  const handlePlaceSelect = useCallback(
    async (placeId) => {
      if (!placesService) return;

      const request = {
        placeId,
        fields: ['name', 'formatted_address', 'geometry.location']
      };

      placesService.getDetails(request, (place, status) => {
        if (status === places.PlacesServiceStatus.OK && place) {
          onPlaceSelect({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address,
            name: place.name
          });
          setShowPredictions(false);
          setSessionToken(new places.AutocompleteSessionToken());
        }
      });
    },
    [placesService, places, onPlaceSelect]
  );

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputContainer}>
        <span className={styles.searchIcon}>
          🔍
        </span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowPredictions(true)}
          placeholder="Search for a location..."
          className={styles.searchInput}
        />
      </div>

      {showPredictions && predictions.length > 0 && (
        <div className={styles.predictionsContainer}>
          {predictions.map((prediction) => (
            <button
              key={prediction.place_id}
              onClick={() => handlePlaceSelect(prediction.place_id)}
              className={styles.predictionItem}
            >
              <div className={styles.predictionMain}>
                {prediction.structured_formatting?.main_text || prediction.description}
              </div>
              <div className={styles.predictionSecondary}>
                {prediction.structured_formatting?.secondary_text || ''}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Main component
const LocationSelector = ({ 
  apiKey = globalConfig.googleMapApiKey,
  defaultCenter = { lat: 37.7749, lng: -122.4194 },
  onLocationSelect,
  height = '400px'
}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  // Geocoder to convert lat/lng to address
  const geocodeLocation = useCallback(async (lat, lng) => {
    setIsLoadingAddress(true);
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({
        location: { lat, lng }
      });

      if (response.results && response.results.length > 0) {
        const address = response.results[0].formatted_address;
        return address;
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    setIsLoadingAddress(false);
    return 'Address not found';
  }, []);

  // Handle map click
  const handleMapClick = useCallback(async (event) => {
    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;
    
    setIsLoadingAddress(true);
    const address = await geocodeLocation(lat, lng);
    
    const location = {
      lat,
      lng,
      address,
      name: 'Selected Location'
    };

    setSelectedLocation(location);
    setSearchValue(address);
    setIsLoadingAddress(false);
    
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  }, [geocodeLocation, onLocationSelect]);

  // Handle place selection from search
  const handlePlaceSelect = useCallback((place) => {
    setSelectedLocation(place);
    setSearchValue(place.address);
    
    if (onLocationSelect) {
      onLocationSelect(place);
    }
  }, [onLocationSelect]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedLocation(null);
    setSearchValue('');
    if (onLocationSelect) {
      onLocationSelect(null);
    }
  }, [onLocationSelect]);

  return (
    <div className={styles.container}>
      <APIProvider apiKey={apiKey} libraries={['places']}>
        <PlacesAutocomplete
          onPlaceSelect={handlePlaceSelect}
          value={searchValue}
          onChange={setSearchValue}
        />

        <div className={styles.mapContainer} style={{ height }}>
          <Map
            defaultCenter={defaultCenter}
            defaultZoom={10}
            center={selectedLocation || defaultCenter}
            onClick={handleMapClick}
            gestureHandling="greedy"
            disableDefaultUI={false}
            className={styles.mapElement}
          >
            {selectedLocation && (
              <Marker
                position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              />
            )}
          </Map>
        </div>

        {selectedLocation && (
          <div className={styles.locationInfo}>
            <div className={styles.locationHeader}>
              <div className={styles.locationContent}>
                <span className={styles.locationIcon}>
                  📍
                </span>
                <div className={styles.locationDetails}>
                  <h3 className={styles.locationTitle}>Selected Location</h3>
                  <p className={styles.locationAddress}>
                    {isLoadingAddress ? 'Loading address...' : selectedLocation.address}
                  </p>
                  <p className={styles.locationCoordinates}>
                    Coordinates: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                  </p>
                </div>
              </div>
              <button
                onClick={clearSelection}
                className={styles.clearButton}
                title="Clear selection"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </APIProvider>
    </div>
  );
};

// Example usage component
const App = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    console.log('Selected location:', location);
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Location Selector</h1>
      <p className={styles.description}>
        Search for a location or click anywhere on the map to select it.
      </p>
      
      <LocationSelector
        apiKey={globalConfig.googleMapApiKey}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        onLocationSelect={handleLocationSelect}
        height="500px"
      />

      {selectedLocation && (
        <div className={styles.exampleSection}>
          <h3 className={styles.exampleTitle}>Location Data:</h3>
          <pre className={styles.exampleCode}>
            {JSON.stringify(selectedLocation, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;