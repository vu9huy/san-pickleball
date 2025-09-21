"use client"
import React, { useState, useEffect } from "react";
import styles from "./LocationProvider.module.css";
import { useEditUserByIdFetchingApi } from "@/api/serverApi/callApi";
import AddressSelector from "./AddressSelector";
import LocationDisplay from "./LocationDisplay";
import LoadingCard from "./LoadingCard";
import AuthRequired from "./AuthRequired";


async function reverseGeocodeOSM(lat, lon, lang = "vi") {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.search = new URLSearchParams({
    lat,
    lon,
    format: "jsonv2",
    addressdetails: "1",
    "accept-language": lang,
  });

  const res = await fetch(url, {
    headers: { "Accept-Language": lang },
  });

  const data = await res.json();
  return {
    displayName: data.display_name,
    address: data.address,
  };
}

const LocationProvider = ({userData, userDataLoading, showRequiredMessage = false, userDataRefesh}) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [locationMethod, setLocationMethod] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  
  // Add state to track the latest saved location for immediate display
  const [latestSavedLocation, setLatestSavedLocation] = useState(null);

  const { mutateAsync: editUserMutateAsync, isPending: editUserLoading } = useEditUserByIdFetchingApi();

  // Check if user already has location data (use latest saved location if available)
  const effectiveUserLocation = latestSavedLocation || userData?.location;
  const hasUserLocation = effectiveUserLocation?.coordinates && effectiveUserLocation.coordinates.length === 2;

  // Check if methodGrid is being displayed
  const isMethodGridDisplayed = (!hasUserLocation || isEditingLocation) && !locationMethod;

  // Get browser location
  const getBrowserLocation = async () => {
    setIsLoadingLocation(true);
    setError('');
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Trình duyệt không hỗ trợ định vị');
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });

      // Set location permission granted when user allows
      setLocationPermissionGranted(true);

      const address = await reverseGeocodeOSM(position.coords.latitude, position.coords.longitude);
      // console.log("address434334", address);
      
      const locationData = {
        type: "Point",
        coordinates: [position.coords.longitude, position.coords.latitude],
        displayName: address.displayName || '',
        address: {
          amenity: address.address?.amenity || '',
          house_number: address.address?.house_number || '',
          office: address.address?.office || '',
          road: address.address?.road || '',
          quarter: address.address?.quarter || '',
          suburb: address.address?.suburb || '',
          city: address.address?.city || '',
          "ISO3166-2-lvl4": address.address?.["ISO3166-2-lvl4"] || '',
          postcode: address.address?.postcode || '',
          country: address.address?.country || '',
          country_code: address.address?.country_code || '',
        },
        selectedLocation: {
          province: '',
          district: '',
          detailAddress: '',
        }
      };

      setCurrentLocation(locationData);
      setLocationMethod('browser');
      setSuccess('Đã lấy vị trí từ trình duyệt thành công!');
    } catch (err) {
      setError('Không thể lấy vị trí: ' + (err.message || 'Lỗi không xác định'));
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Handle manual address selection
  const handleManualLocationFound = (locationData) => {
    setCurrentLocation(locationData);
    setLocationMethod('manual');
    setError('');
    setSuccess('Đã tìm thấy địa chỉ!');
  };

  // Save location to database
  const saveLocationToDatabase = async () => {
    setIsLoadingLocation(true);
    setError('');
    setSuccess('');

    try {
      if (!currentLocation) {
        throw new Error('Không có dữ liệu địa chỉ để lưu');
      }

      console.log("Saving location data:", currentLocation);
      
      const userId = userData?.id;
      if (!userId) {
        throw new Error('Không tìm thấy thông tin người dùng');
      }
      
      const response = await editUserMutateAsync({ 
        userId: userId, 
        userData: { location: currentLocation } 
      });

      console.log("Save response:", response);
      
      // Update latest saved location for immediate display
      setLatestSavedLocation(currentLocation);
      
      // Clear the current location and form state to hide detailed display
      setCurrentLocation(null);
      setLocationMethod('');
      
      setSuccess('Lưu vị trí thành công!');
      setIsEditingLocation(false);
      userDataRefesh();
    } catch (err) {
      console.error("Save error:", err);
      setError('Lỗi lưu vị trí: ' + (err.message || 'Lỗi không xác định'));
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleManualLocationSelect = () => {
    setLocationMethod('manual');
    setCurrentLocation(null);
    setError('');
    setSuccess('');
  };

  const resetForm = () => {
    setLocationMethod('');
    setCurrentLocation(null);
    setError('');
    setSuccess('');
  };

  const handleChangeLocation = () => {
    setIsEditingLocation(true);
    // Clear latest saved location when editing to show fresh data
    setLatestSavedLocation(null);
    resetForm();
  };

  const handleCancelEdit = () => {
    setIsEditingLocation(false);
    resetForm();
  };

  if (userDataLoading) {
    return <LoadingCard message="Loading..." />;
  }

  // if (!userData) {
  //   return <AuthRequired />;
  // }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Show required message if location is needed for map functionality */}
        {showRequiredMessage && !hasUserLocation && !currentLocation && (
          <div className={styles.requirementAlert}>
            <div className={styles.requirementIcon}>⚠️</div>
            <div className={styles.requirementContent}>
              <h3 className={styles.requirementTitle}>Vị trí bắt buộc</h3>
              <p className={styles.requirementText}>
                Bạn cần cung cấp vị trí của mình để sử dụng tính năng bản đồ và tìm kiếm người dùng khác.
              </p>
            </div>
          </div>
        )}

        {/* Show current location status when user has saved location */}
        {hasUserLocation && userData && !showRequiredMessage && (
          <div className={styles.currentLocationStatus}>
            {/* <div className={styles.statusIcon}>✅</div> */}
            <div className={styles.statusContent}>
              <h3 className={styles.statusTitle}>Vị trí hiện tại</h3>
              <p className={styles.statusText}>
                {effectiveUserLocation.displayName || 'Vị trí của bạn đã được lưu thành công'}
              </p>
            </div>
            {!isEditingLocation && (
              <button
                onClick={handleChangeLocation}
                className={styles.changeLocationBtn}
              >
                Đổi vị trí
              </button>
            )}
            {/* Show Cancel button when methodGrid is displayed */}
            {isEditingLocation && isMethodGridDisplayed && (
              <button
                onClick={handleCancelEdit}
                className={styles.changeLocationBtn}
              >
                Hủy
              </button>
            )}
          </div>
        )}

        {/* Title and Description - show when no user location or editing location or when no userData but need to get location */}
        {((!hasUserLocation || isEditingLocation || !userData) && (locationMethod || !hasUserLocation || !userData)) && (
          <>
            <h1 className={styles.title}>
              {hasUserLocation && isEditingLocation ? 'Cập nhật vị trí của bạn' : 'Cung cấp vị trí của bạn'}
            </h1>
            <p className={styles.description}>
              Sử dụng định vị trình duyệt hoặc chọn tỉnh/thành phố thủ công
            </p>
          </>
        )}

        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className={styles.successMessage}>
            {success}
          </div>
        )}

        {/* Current Location Display - Only show when editing/selecting new location */}
        {currentLocation && (isEditingLocation || !hasUserLocation) && (
          <LocationDisplay 
            userData={userData}
            location={currentLocation}
            method={locationMethod}
          />
        )}

        {/* Location Method Selection - show when editing, no location, or no userData */}
        {((!hasUserLocation || isEditingLocation || !userData) && !locationMethod) && (
          <div className={styles.methodGrid}>
            <button
              onClick={getBrowserLocation}
              disabled={isLoadingLocation}
              className={styles["get-location-method"]}
            >
              <div className={styles.methodIcon}>📍</div>
              <h3 className={styles.methodTitle}>
                Sử dụng vị trí thực
              </h3>
              <p className={styles.methodDescription}>
                Lấy vị trí từ trình duyệt
              </p>
            </button>

            <button
              onClick={handleManualLocationSelect}
              disabled={isLoadingLocation}
              className={styles["get-location-method"]}
            >
              <div className={styles.methodIcon}>🗺️</div>
              <h3 className={styles.methodTitle}>
                Chọn vị trí
              </h3>
              <p className={styles.methodDescription}>
                Chọn tỉnh/thành phố và quận/huyện
              </p>
            </button>
          </div>
        )}

        {/* Manual Location Selection */}
        {locationMethod === 'manual' && !currentLocation && (
          <AddressSelector 
            onLocationFound={handleManualLocationFound}
            onError={setError}
          />
        )}

        {/* Action Buttons - show when editing, no initial location, or no userData but has location method/currentLocation */}
        {((!hasUserLocation || isEditingLocation || !userData) && (locationMethod || currentLocation)) && (
          <div className={styles.actionButtons}>
            {locationMethod && (
              <button
                onClick={resetForm}
                disabled={isLoadingLocation}
                className={styles.secondaryButton}
              >
                Chọn lại
              </button>
            )}
            
            {currentLocation && userData && (
              <button
                onClick={saveLocationToDatabase}
                disabled={isLoadingLocation || editUserLoading}
                className={`${
                  (isLoadingLocation || editUserLoading)
                    ? styles.buttonDisabled
                    : ''
                } ${styles.primaryButton}`}
              >
                {editUserLoading && (
                  <div className={styles.smallSpinner}></div>
                )}
                {editUserLoading ? 'Đang lưu...' : (hasUserLocation ? 'Cập nhật vị trí' : 'Lưu vị trí')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationProvider;