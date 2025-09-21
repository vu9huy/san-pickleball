// "use client";

// // import Geolocation from "@/components/geolocation/GeoLocation";
// import styles from "./page.module.css";
// import React, { useEffect, useState, useRef, Suspense } from "react";
// import SelectAddress from "@/components/selectAddress/SelectAddress";
// // import MapboxMap from "@/components/mapbox/MapBox";
// import VisglMapContainer from "@/components/googleMap/VisglMapProvider";
// import { loadCourtDataset } from "@/data/courts/courts";
// import filterCourts from "@/helpers/filterCourts";
// import CourtInfoWindow from "@/components/courtInfoWindow/CourtInfoWindow";
// import CourtNumber from "@/components/courtInfoComponents/courtNumber/CourtNumber";
// import CourtsFilter from "@/components/courtsFilter/CourtsFilter";
// import WeatherList from "@/components/weather/weatherList/WeatherList";
// import Pagination from "@/components/pagination/Pagination";
// import useSelectAddress from "@/customHook/useSelectAddress";
// import useGetCourts from "@/customHook/useGetCourts";
// import useLazyLoadMap from "@/customHook/useLazyLoadMap";
// import CourtsList from "@/components/courts_list/CourtsList";

// // load data asynchronously
// const getCourtsData = async ({ province, district, setCourts, setAllCourts }) => {
//     const data = await loadCourtDataset();
//     const courts = data.courts;
//     const filteredCourts = filterCourts({ courts, province, district });
//     setAllCourts(filteredCourts);
//     setCourts(filteredCourts);

//     const totalPages = data.totalPages;
//     const totalCourts = data.totalResults;
// };

// export default function TimSan({ searchParams }) {
//     const {
//         province,
//         setProvince,
//         district,
//         setDistrict
//     } = useSelectAddress(searchParams);

//     const {
//         totalPages,
//         totalCourts,
//         courts,
//         setCourts
//     } = useGetCourts(searchParams);

//     const [viewState, setViewState] = useState({
//         lat: null,
//         lng: null,
//         zoom: null
//     });

//     const [displayFilter, setDisplayFilter] = useState(false);

//     const handleDisplayFilter = (e) => {
//         e.preventDefault();
//         setDisplayFilter(!displayFilter);
//     };


//     // FILTER BY BOOKING
//     // const [queryString, setQueryString] = useState("");
//     // const { data: response, isPending, isError, refetch: refetchGetBookingByDateTime } = useGetBookingByDateTimeFetchingApi(queryString);
//     // const bookings = response?.data?.results || [];


//     const handleFilterCourt = async (data) => {

//         // FILTER BY BOOKING
//         // const bookingData = {
//         //     bookingInfo: {
//         //         ...data.booking
//         //     }
//         // };
//         // const queryString = buildQueryString(bookingData);
//         // setQueryString(queryString);
//         // return;

//         const filtered = courts.filter(court => {

//             // Check name
//             const matchName = !data.name || court.name.toLowerCase().includes(data.name.toLowerCase());

//             // Check surface
//             const matchSurface = !data.surface || court.surface === data.surface;

//             // Check amenities
//             const selectedAmenities = Object.keys(data.amenities).filter(key => data.amenities[key]);
//             const matchAmenities = selectedAmenities.length === 0 || selectedAmenities.some(
//                 key => court.amenities[key]
//             );

//             // Check feature
//             const selectedFeatures = Object.keys(data.feature).filter(key => data.feature[key]);
//             const matchFeature = selectedFeatures.length === 0 || selectedFeatures.some(
//                 key => court.feature[key]
//             );

//             return matchName && matchSurface && matchAmenities && matchFeature;
//         });
//         setCourts(filtered);
//     };

//     // //Lazy goolge map
//     const { isBottomVisible, bottomRef, VisglMapContainer } = useLazyLoadMap();

//     return (
//         <div className={`${styles["tim-san-container"]} page-width`}>
//             <Pagination totalPages={totalPages} loading={false} />

//             <h1>Tìm kiếm sân pickleball trên toàn quốc</h1>
//             <SelectAddress
//                 province={province}
//                 setProvince={setProvince}
//                 district={district}
//                 setDistrict={setDistrict}
//                 setViewState={setViewState}
//             />

//             <div className={`${styles["court-filter-wrapper"]} ${displayFilter ? styles["active"] : ""}`}>
//                 <div className={styles["court-filter-header"]}>
//                     <span className={styles["courts-filter-number-container"]}>
//                         <CourtNumber number={totalCourts} type="location" />
//                     </span>
//                     <span className={styles["courts-filter-button"]} onClick={handleDisplayFilter}>Lọc</span>
//                 </div>
//                 <div className={`${styles["court-filter-body"]} custom-scroll-bar`}>
//                     <CourtsFilter handleFilterSubmit={handleFilterCourt} handleDisplayFilter={handleDisplayFilter} />
//                 </div>
//                 <span className={styles["courts-number-container"]}>
//                     <CourtNumber number={totalCourts} type="location" />
//                 </span>
//             </div>

//             <div className={styles["courts-list"]}>
//                 {courts?.map((court) => <CourtInfoWindow court={court} key={court.id} displayType={"listitem"} />)}
//             </div>

//             {/* <div className={styles["map-container"]}>
//                 <p className={styles["map-note-message"]}>*Click vào biểu tượng bóng pickleball trên bản đồ để xem thông tin sân</p>
//                 <VisglMapContainer province={province} district={district} viewState={viewState} />
//             </div> */}

//             {/* Lazy map */}
//             <div ref={bottomRef} style={{ height: '0' }} />
//             {isBottomVisible && (
//                 <Suspense fallback={<div>Loading...</div>}>
//                     <div className={styles["map-container"]}>
//                         <p className={styles["map-note-message"]}>*Click vào biểu tượng bóng pickleball trên bản đồ để xem thông tin sân</p>
//                         <VisglMapContainer province={province} district={district} viewState={viewState} courts={courts} />
//                     </div>
//                 </Suspense>
//             )}

//             {/* <MapboxMap viewState={viewState}/> */}
//             <div className="">
//                 <WeatherList province={province} />
//             </div>
//         </div>
//     );
// }


"use client";

import styles from "./page.module.css";
import React, { useEffect, useState, Suspense, useCallback } from "react";
import SelectAddress from "@/components/selectAddress/SelectAddress";
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
import useLazyLoadMap from "@/customHook/useLazyLoadMap";

export default function TimSan({ searchParams }) {
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

    const [viewState, setViewState] = useState({
        lat: null,
        lng: null,
        zoom: null
    });

    const [displayFilter, setDisplayFilter] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDisplayFilter = useCallback((e) => {
        e.preventDefault();
        setDisplayFilter(!displayFilter);
    }, [displayFilter]);

    const handleFilterCourt = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);

            const filtered = courts.filter(court => {
                // Check name
                const matchName = !data.name || 
                    court.name.toLowerCase().includes(data.name.toLowerCase());

                // Check surface
                const matchSurface = !data.surface || court.surface === data.surface;

                // Check amenities
                const selectedAmenities = Object.keys(data.amenities || {})
                    .filter(key => data.amenities[key]);
                const matchAmenities = selectedAmenities.length === 0 || 
                    selectedAmenities.some(key => court.amenities?.[key]);

                // Check features
                const selectedFeatures = Object.keys(data.feature || {})
                    .filter(key => data.feature[key]);
                const matchFeature = selectedFeatures.length === 0 || 
                    selectedFeatures.some(key => court.feature?.[key]);

                return matchName && matchSurface && matchAmenities && matchFeature;
            });
            
            setCourts(filtered);
        } catch (err) {
            setError('Có lỗi xảy ra khi lọc sân. Vui lòng thử lại.');
            console.error('Filter error:', err);
        } finally {
            setLoading(false);
        }
    }, [courts, setCourts]);

    // Lazy loading map
    const { isBottomVisible, bottomRef } = useLazyLoadMap();

    if (error) {
        return (
            <div className={`${styles["tim-san-container"]} page-width`}>
                <div className={styles["error-container"]}>
                    <p>❌ {error}</p>
                    <button onClick={() => window.location.reload()}>
                        Tải lại trang
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles["tim-san-container"]} page-width`}>
            <Pagination totalPages={totalPages} loading={loading} />

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
                    <span className={styles["courts-filter-button"]} onClick={handleDisplayFilter}>Lọc sân</span>
                </div>
                
                <div className={`${styles["court-filter-body"]} custom-scroll-bar`}>
                    <CourtsFilter 
                        handleFilterSubmit={handleFilterCourt} 
                        handleDisplayFilter={handleDisplayFilter}
                        loading={loading}
                    />
                </div>
                
                <span className={styles["courts-number-container"]}>
                    <CourtNumber number={totalCourts} type="location" />
                </span>
            </div>

            <div className={styles["courts-list"]}>
                {loading && <div className={styles["loading"]}>Đang tải...</div>}
                {courts?.length === 0 && !loading && (
                    <div className={styles["no-results"]}>
                        Không tìm thấy sân nào phù hợp với tiêu chí của bạn.
                    </div>
                )}
                {courts?.map((court) => (
                    <CourtInfoWindow 
                        court={court} 
                        key={court.id || court.slug} 
                        displayType="listitem" 
                    />
                ))}
            </div>

            {/* Lazy loaded map */}
            <div ref={bottomRef} style={{ height: '1px' }} />
            {isBottomVisible && (
                <Suspense fallback={<div className={styles["map-loading"]}>Đang tải bản đồ...</div>}>
                    <div className={styles["map-container"]}>
                        <p className={styles["map-note-message"]}>
                            *Click vào biểu tượng bóng pickleball trên bản đồ để xem thông tin sân
                        </p>
                        <VisglMapContainer 
                            province={province} 
                            district={district} 
                            viewState={viewState} 
                            courts={courts} 
                        />
                    </div>
                </Suspense>
            )}

            <div className={styles["weather-section"]}>
                <WeatherList province={province} />
            </div>
        </div>
    );
}