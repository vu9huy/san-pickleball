import React from 'react';
import { AdvancedMarker, Marker } from '@vis.gl/react-google-maps';
import UserInfoWindow from './UserInfoWindow';
import MapMarkerIcon from './MapMarkerIcon';

const UserMarker = ({ user, isSelected, onSelect, onClose }) => {
    
  const handleMarkerClick = () => {
    if (isSelected) {
      onClose();
    } else {
      onSelect(user.id);
    }
  };

  const markerPosition = {
    lng: user.location.coordinates[0],
    lat: user.location.coordinates[1]
  };

  return (
    <>
        <AdvancedMarker 
            position={markerPosition}
            onClick={handleMarkerClick}
        >
          <MapMarkerIcon user={user}/>
        </AdvancedMarker>
        {isSelected && (
            <UserInfoWindow
              user={user}
              onClose={onClose}
            />
        )}
    </>
  );
};

export default UserMarker;

