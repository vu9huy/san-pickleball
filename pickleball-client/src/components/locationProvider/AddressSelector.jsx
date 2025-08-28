import React, { useState, useId, useMemo, useRef } from "react";
import ReactSelect from "react-select";
import styles from "./AddressSelector.module.css";
import vietnameseProvincesData from "@/data/provinces/vietnamese_provinces_list.json";

// Mock data for Vietnamese provinces
// const vietnameseProvincesData = [
//   {
//     value: "hanoi",
//     label: "Hà Nội",
//     slug: "ha-noi",
//     districts: [
//       { value: "ba-dinh", label: "Ba Đình", slug: "ba-dinh" },
//       { value: "hoan-kiem", label: "Hoàn Kiếm", slug: "hoan-kiem" },
//       { value: "dong-da", label: "Đống Đa", slug: "dong-da" }
//     ]
//   },
//   {
//     value: "ho-chi-minh",
//     label: "Thành phố Hồ Chí Minh",
//     slug: "ho-chi-minh",
//     districts: [
//       { value: "district-1", label: "Quận 1", slug: "quan-1" },
//       { value: "district-3", label: "Quận 3", slug: "quan-3" },
//       { value: "binh-thanh", label: "Bình Thạnh", slug: "binh-thanh" }
//     ]
//   },
//   {
//     value: "da-nang",
//     label: "Đà Nẵng",
//     slug: "da-nang",
//     districts: []
//   }
// ];

const reactSelectCustomStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '42px',
    border: state.isFocused 
      ? '1px solid var(--primary-color, #22c55e)' 
      : '1px solid var(--light-primary-color, #86efac)',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: state.isFocused 
      ? '0 0 0 1px var(--primary-color, #22c55e)' 
      : 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      border: '1px solid var(--primary-color, #22c55e)'
    }
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--text-light-1, #6b7280)',
    fontSize: '14px'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--text-dark, #1f2937)',
    fontSize: '14px'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? 'var(--primary-color, #22c55e)' 
      : state.isFocused 
        ? 'var(--light-primary-color, #86efac)' 
        : '#ffffff',
    color: state.isSelected 
      ? 'white' 
      : 'var(--text-dark, #1f2937)',
    fontSize: '14px',
    '&:active': {
      backgroundColor: 'var(--primary-color, #22c55e)'
    }
  }),
  menu: (provided) => ({
    ...provided,
    border: '1px solid var(--light-primary-color, #86efac)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  }),
  control: (provided, state) => ({
    ...provided,
    minHeight: '42px',
    border: state.isFocused 
      ? '1px solid var(--primary-color, #22c55e)' 
      : '1px solid var(--light-primary-color, #86efac)',
    borderRadius: '8px',
    backgroundColor: state.isDisabled ? '#f9fafb' : '#ffffff',
    boxShadow: state.isFocused 
      ? '0 0 0 1px var(--primary-color, #22c55e)' 
      : 'none',
    transition: 'all 0.2s ease',
    opacity: state.isDisabled ? 0.6 : 1,
    '&:hover': {
      border: state.isDisabled 
        ? '1px solid #e5e7eb' 
        : '1px solid var(--primary-color, #22c55e)'
    }
  })
};

async function geocodeOSM(query) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.search = new URLSearchParams({
    q: query,
    format: "json",
    addressdetails: "1",
    limit: "1",
  });
  const res = await fetch(url, {
    headers: { "Accept-Language": "vi" },
  });
  const data = await res.json();
  if (!data.length) return null;
  const hit = data[0];
  return {
    lat: parseFloat(hit.lat),
    lon: parseFloat(hit.lon),
    displayName: hit.display_name,
    address: hit.address,
  };
}

const AddressSelector = ({ onLocationFound, onError }) => {
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [detailAddress, setDetailAddress] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const selectProvince = (provinceSelected) => {
    setProvince(provinceSelected);
    setDistrict(null); // Reset district when province changes
  };

  const selectDistrict = (districtSelected) => {
    setDistrict(districtSelected);
  };

  const handleGetAddress = async () => {
    if (!province) {
      onError('Vui lòng chọn tỉnh/thành phố');
      return;
    }

    setIsLoadingAddress(true);
    onError(''); // Clear previous errors
    
    try {
      // Build query string for geocoding
      let query = '';
      
      if (detailAddress.trim()) {
        if (district) {
          query = `${detailAddress.trim()}, ${district.label}, ${province.label}, Vietnam`;
        } else {
          query = `${detailAddress.trim()}, ${province.label}, Vietnam`;
        }
      } else {
        if (district) {
          query = `${district.label}, ${province.label}, Vietnam`;
        } else {
          query = `${province.label}, Vietnam`;
        }
      }

      console.log('Geocoding query:', query);
      const geocodeResult = await geocodeOSM(query);
      
      if (geocodeResult) {
        // Format the location data according to the required structure
        const locationData = {
          type: "Point",
          coordinates: [geocodeResult.lon, geocodeResult.lat],
          displayName: geocodeResult.displayName || '',
          address: {
            amenity: geocodeResult.address?.amenity || '',
            house_number: geocodeResult.address?.house_number || '',
            office: geocodeResult.address?.office || '',
            road: geocodeResult.address?.road || '',
            quarter: geocodeResult.address?.quarter || '',
            suburb: geocodeResult.address?.suburb || '',
            city: geocodeResult.address?.city || '',
            "ISO3166-2-lvl4": geocodeResult.address?.["ISO3166-2-lvl4"] || '',
            postcode: geocodeResult.address?.postcode || '',
            country: geocodeResult.address?.country || '',
            country_code: geocodeResult.address?.country_code || '',
          },
          selectedLocation: {
            province: province.label || '',
            district: district?.label || '',
            detailAddress: detailAddress.trim() || '',
          }
        };

        onLocationFound(locationData);
      } else {
        onError('Không thể tìm thấy địa chỉ cho vị trí đã chọn');
      }
    } catch (err) {
      onError('Lỗi tìm kiếm địa chỉ: ' + (err.message || 'Lỗi không xác định'));
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const vietnameseProvincesDataRef = useRef(vietnameseProvincesData.slice(1));

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>
        Chọn địa chỉ
      </h4>
      
      <div className={styles.selectContainer}>
        <div className={styles.selectItem}>
          <label className={styles.selectLabel}>
            Tỉnh/thành:
            {province && <span className={styles.selectLabelValue}>{province.label}</span>}
          </label>
          <ReactSelect
            options={vietnameseProvincesDataRef.current}
            styles={reactSelectCustomStyles}
            instanceId={useId()}
            onChange={selectProvince}
            value={province}
            placeholder="Chọn tỉnh/thành phố"
            className="react-select"
            classNamePrefix="react-select"
          />
        </div>

        <div className={styles.selectItem}>
          <label className={styles.selectLabel}>
            Quận/huyện:
            {district && <span className={styles.selectLabelValue}>{district.label}</span>}
          </label>
          <ReactSelect
            options={province?.districts || []}
            styles={reactSelectCustomStyles}
            instanceId={useId()}
            onChange={selectDistrict}
            isDisabled={!province?.districts?.length}
            value={district}
            placeholder={province?.districts?.length ? "Chọn quận/huyện" : "Vui lòng chọn tỉnh/thành phố"}
            className="react-select"
            classNamePrefix="react-select"
          />
        </div>

        <div className={styles.detailAddressContainer}>
          <label className={styles.selectLabel}>
            Địa chỉ chi tiết (đường, số nhà ...):
          </label>
          <input
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder="Nhập địa chỉ chi tiết (tùy chọn)"
            className={styles.detailAddressInput}
          />
        </div>

        <div className={styles.getAddressButtonContainer}>
          <button
            onClick={handleGetAddress}
            disabled={isLoadingAddress || !province}
            className={`${styles.getAddressButton} ${
              (isLoadingAddress || !province) 
                ? styles.buttonDisabled
                : ''
            }`}
          >
            {isLoadingAddress && (
              <div className={styles.smallSpinner}></div>
            )}
            {isLoadingAddress ? 'Đang tìm...' : 'Tìm địa chỉ'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressSelector;