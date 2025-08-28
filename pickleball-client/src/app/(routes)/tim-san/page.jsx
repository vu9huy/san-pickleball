"use client";

// import Geolocation from "@/components/geolocation/GeoLocation";
import styles from "./page.module.css";
import React, { useEffect, useState, useRef, Suspense } from "react";
import SelectAddress from "@/components/selectAddress/SelectAddress";
// import MapboxMap from "@/components/mapbox/MapBox";
import VisglMapContainer from "@/components/googleMap/VisglMapProvider";
import { loadCourtDataset } from "@/data/courts/courts";
import filterCourts from "@/helpers/filterCourts";
import CourtInfoWindow from "@/components/courtInfoWindow/CourtInfoWindow";
import CourtNumber from "@/components/courtInfoComponents/courtNumber/CourtNumber";
import CourtsFilter from "@/components/courtsFilter/CourtsFilter";
import WeatherList from "@/components/weather/weatherList/WeatherList";
import Pagination from "@/components/pagination/Pagination";
import useSelectAddress from "@/customHook/useSelectAddress";
import useGetCourts from "@/customHook/useGetCourts";
// import useLazyLoadMap from "@/customHook/useLazyLoadMap";

// load data asynchronously
const getCourtsData = async ({ province, district, setCourts, setAllCourts }) => {
    const data = await loadCourtDataset();
    const courts = data.courts;
    const filteredCourts = filterCourts({ courts, province, district });
    setAllCourts(filteredCourts);
    setCourts(filteredCourts);

    const totalPages = data.totalPages;
    const totalCourts = data.totalResults;
};

// const buildQueryString = (obj, prefix = "") => {
//     return Object.keys(obj)
//         .map(key => {
//             const value = obj[key];
//             const prefixedKey = prefix ? `${prefix}[${key}]` : key;

//             if (value instanceof Date && !isNaN(date)) {
//                 return `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(value.toISOString())}`;
//             }

//             // If the value is an object, recursively build the query string
//             if (typeof value === "object" && value !== null) {
//                 return buildQueryString(value, prefixedKey);
//             }

//             // Otherwise, return the encoded key-value pair
//             return `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(value)}`;
//         })
//         .join("&");
// };


export default function TimSan({ searchParams }) {
    // const [geolocation, setGeolocation] = useState({});
    
    const {
        province,
        setProvince,
        district,
        setDistrict
    } = useSelectAddress(searchParams);

    const {
        totalPages,
        totalCourts,
        courts,
        setCourts
    } = useGetCourts(searchParams);

    // useEffect(() => {
    //     getCourtsData({ province, district, setCourts, setAllCourts });
    // }, [province, district]);


    const [viewState, setViewState] = useState({
        lat: null,
        lng: null,
        zoom: null
    });


    const [displayFilter, setDisplayFilter] = useState(false);

    const handleDisplayFilter = (e) => {
        e.preventDefault();
        setDisplayFilter(!displayFilter);
    };


    // FILTER BY BOOKING
    // const [queryString, setQueryString] = useState("");
    // const { data: response, isPending, isError, refetch: refetchGetBookingByDateTime } = useGetBookingByDateTimeFetchingApi(queryString);
    // const bookings = response?.data?.results || [];


    const handleFilterCourt = async (data) => {

        // FILTER BY BOOKING
        // const bookingData = {
        //     bookingInfo: {
        //         ...data.booking
        //     }
        // };
        // const queryString = buildQueryString(bookingData);
        // setQueryString(queryString);
        // return;

        const filtered = courts.filter(court => {

            // Check name
            const matchName = !data.name || court.name.toLowerCase().includes(data.name.toLowerCase());

            // Check surface
            const matchSurface = !data.surface || court.surface === data.surface;

            // Check amenities
            const selectedAmenities = Object.keys(data.amenities).filter(key => data.amenities[key]);
            const matchAmenities = selectedAmenities.length === 0 || selectedAmenities.some(
                key => court.amenities[key]
            );

            // Check feature
            const selectedFeatures = Object.keys(data.feature).filter(key => data.feature[key]);
            const matchFeature = selectedFeatures.length === 0 || selectedFeatures.some(
                key => court.feature[key]
            );

            return matchName && matchSurface && matchAmenities && matchFeature;
        });
        setCourts(filtered);
    };


    // //Lazy goolge map
    // const { isBottomVisible, bottomRef, VisglMapContainer } = useLazyLoadMap();

    return (
        <div className={`${styles["tim-san-container"]} page-width`}>

            <Pagination totalPages={totalPages} loading={false} />

            {/* <Geolocation geolocation={geolocation} setGeolocation={setGeolocation} /> */}
            {/* <p>Trang web đang trong quá trình hoàn thiện, dữ liệu về sân trên trang web hiện tại là dữ liệu giả phục vụ cho quá trình test. Chúng tôi sẽ cập nhật dữ liệu thực tế nhanh nhất có thể.</p> */}
            <h1>Tìm kiếm sân pickleball trên toàn quốc</h1>
            <SelectAddress
                province={province}
                setProvince={setProvince}
                district={district}
                setDistrict={setDistrict}
                setViewState={setViewState}
            />

            <div className={`${styles["court-filter-wrapper"]} ${displayFilter ? styles["active"] : ""}`}>
                <div className={styles["court-filter-header"]}>
                    <span className={styles["courts-filter-number-container"]}>
                        <CourtNumber number={totalCourts} type="location" />
                    </span>
                    <span className={styles["courts-filter-button"]} onClick={handleDisplayFilter}>Lọc</span>
                </div>
                <div className={`${styles["court-filter-body"]} custom-scroll-bar`}>
                    {/* <div className={styles["court-filter-body-close"]}>
                    <button className="button" onClick={handleDisplayFilter}>&times;</button>
                </div> */}
                    <CourtsFilter handleFilterSubmit={handleFilterCourt} handleDisplayFilter={handleDisplayFilter} />
                </div>
                <span className={styles["courts-number-container"]}>
                    <CourtNumber number={totalCourts} type="location" />
                </span>
            </div>

            <div className={styles["courts-list"]}>
                {courts?.map((court) => <CourtInfoWindow court={court} key={court.id} displayType={"listitem"} />)}
            </div>

            <div className={styles["map-container"]}>
                <p className={styles["map-note-message"]}>*Click vào biểu tượng bóng pickleball trên bản đồ để xem thông tin sân</p>
                <VisglMapContainer province={province} district={district} viewState={viewState} />
            </div>

            {/* Lazy map */}
            {/* <div ref={bottomRef} style={{ height: '0' }} />
            {isBottomVisible && (
                <Suspense fallback={<div>Loading...</div>}>
                    <div className={styles["map-container"]}>
                        <p className={styles["map-note-message"]}>*Click vào biểu tượng bóng pickleball trên bản đồ để xem thông tin sân</p>
                        <VisglMapContainer province={province} district={district} viewState={viewState} courts={courts} />
                    </div>
                </Suspense>
            )} */}

            {/* <MapboxMap viewState={viewState}/> */}
            <div className="">
                <WeatherList province={province} />
            </div>
        </div>
    );
}