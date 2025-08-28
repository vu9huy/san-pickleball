"use client"

import React, { useState, useMemo } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import styles from './UserLocationMap.module.css';
import { COUNTRY_ZOOM, GOOGLE_MAP_API_KEY, GOOGLE_MAP_MAP_ID, VIETNAME_CENTER_COORDINATES } from '@/constants/VisglMapConstant';
import useGetUserLocations from '@/customHook/useGetUserLocations';
import UserMarker from './UserMarker';

const DEFAULT_RADIUS = 50;

const UserLocationMap = ({userData}) => {  
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [radius, setRadius] = useState(10);
  const [minLevel, setMinLevel] = useState(2);
  const [maxLevel, setMaxLevel] = useState(6);
  const [showControls, setShowControls] = useState(false);
  
  // Check if user has location data
  const hasUserLocation = userData?.location?.coordinates && userData.location.coordinates.length === 2;
  
  // Use DEFAULT_RADIUS for the hook call, no level filtering in hook
  const { users: allUsers } = useGetUserLocations(userData, DEFAULT_RADIUS);

  // Haversine formula to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  // Filter users based on radius and level at frontend
  const filteredUsers = useMemo(() => {
    if (!allUsers || !hasUserLocation) return [];
    
    return allUsers.filter(user => {
      // Filter by level range
      if (user.level < minLevel || user.level > maxLevel) {
        return false;
      }
      
      // Filter by radius
      if (user.location?.coordinates && user.location.coordinates.length === 2) {
        const userLat = userData.location.coordinates[1];
        const userLon = userData.location.coordinates[0];
        const otherUserLat = user.location.coordinates[1];
        const otherUserLon = user.location.coordinates[0];
        
        const distance = calculateDistance(userLat, userLon, otherUserLat, otherUserLon);
        return distance <= radius;
      }
      
      return false;
    });
  }, [allUsers, radius, minLevel, maxLevel, hasUserLocation, userData]);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  const handleCloseInfoWindow = () => {
    setSelectedUserId(null);
  };

  const handleRadiusChange = (e) => {
    setRadius(Number(e.target.value));
  };

  const handleMinLevelChange = (e) => {
    const newMinLevel = Number(e.target.value);
    setMinLevel(newMinLevel);
    if (newMinLevel > maxLevel) {
      setMaxLevel(newMinLevel);
    }
  };

  const handleMaxLevelChange = (e) => {
    const newMaxLevel = Number(e.target.value);
    setMaxLevel(newMaxLevel);
    if (newMaxLevel < minLevel) {
      setMinLevel(newMaxLevel);
    }
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  // Generate level options
  const levelOptions = [];
  for (let i = 2; i <= 6; i += 0.5) {
    levelOptions.push(
      <option key={i} value={i}>
        Level {i}
      </option>
    );
  }

  const MapControls = () => (
    <div className={`${styles.mapControls} ${showControls ? styles.mapControlsVisible : ''}`}>
      <div className={styles.controlHeader}>
        <h4 className={styles.controlTitle}>Lọc người chơi</h4>
        <button 
          className={styles.closeButton}
          onClick={toggleControls}
          type="button"
        >
          ×
        </button>
      </div>

      <div className={styles.controlRow}>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>
            Bán kính: <span className={styles.controlValue}>{radius} km</span>
          </label>
          <input 
            type="range"
            min="0.5"
            max="50"
            step="0.5"
            value={radius} 
            onChange={handleRadiusChange}
            className={styles.rangeSlider}
          />
          <div className={styles.rangeLabels}>
            <span>0.5km</span>
            <span>50km</span>
          </div>
        </div>
      </div>
      
      <div className={styles.controlRow}>
        <div className={styles.levelControls}>
          <div className={styles.levelSelectGroup}>
            <label className={styles.controlLabel}>
              Từ level:
            </label>
            <select 
              value={minLevel} 
              onChange={handleMinLevelChange}
              className={styles.controlSelect}
            >
              {levelOptions}
            </select>
          </div>
          
          <div className={styles.levelSelectGroup}>
            <label className={styles.controlLabel}>
              Đến level:
            </label>
            <select 
              value={maxLevel} 
              onChange={handleMaxLevelChange}
              className={styles.controlSelect}
            >
              {levelOptions}
            </select>
          </div>
        </div>
      </div>
      
      <div className={styles.controlRow}>
        <div className={styles.userCount}>
          <span className={styles.userCountText}>
            Tìm thấy: <span className={styles.userCountNumber}>{filteredUsers?.length || 0}</span> người dùng
          </span>
        </div>
      </div>
    </div>
  );

  if (!hasUserLocation) {
    return (
      <div className={styles.noLocationContainer}>
        <div className={styles.noLocationCard}>
          {/* <div className={styles.noLocationIcon}>📍</div> */}
          <h3 className={styles.noLocationTitle}>
            Cần cung cấp vị trí của bạn
          </h3>
          <p className={styles.noLocationMessage}>
            Bạn cần cung cấp vị trí của mình để có thể xem bản đồ và tìm kiếm người dùng khác trong khu vực.
          </p>
          {/* <p className={styles.noLocationSubMessage}>
            Vui lòng sử dụng chức năng "Cung cấp vị trí" để thiết lập vị trí của bạn.
          </p> */}
        </div>
      </div>
    );
  }

  if(!allUsers) return "Loading..."

  return (
    <div className={styles.container}>
      <div className={styles.mobileControls}>
        <MapControls />
      </div>

      <div className={styles.mapContainer}>
        <button 
          className={`${styles.toggleButton} ${showControls ? styles.hidden : ''}`}
          onClick={toggleControls}
          type="button"
        >
          Lọc người chơi
        </button>

        <div className={styles.desktopControls}>
          <MapControls />
        </div>

        <APIProvider 
          apiKey={""}
          // apiKey={GOOGLE_MAP_API_KEY}
          >
          <Map
            mapId={GOOGLE_MAP_MAP_ID}
            defaultCenter={
              hasUserLocation 
                ? { lat: userData.location.coordinates[1], lng: userData.location.coordinates[0] }
                : VIETNAME_CENTER_COORDINATES
            }
            defaultZoom={COUNTRY_ZOOM}
            gestureHandling="greedy"
            disableDefaultUI={false}
            className={styles.map}
            reuseMaps={true}
            minZoom={5.5}
          >
            {filteredUsers?.map((user) => (
              <UserMarker
                key={user.id}
                user={user}
                isSelected={selectedUserId === user.id}
                onSelect={handleUserSelect}
                onClose={handleCloseInfoWindow}
              />
            ))}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

export default UserLocationMap;