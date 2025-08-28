import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { CourtMarker } from "../marker/CourtMarker";
import VisglInfoWindow from "../infoWindow/InfoWindow";
import MarkerControlPanel from "../controlPannel/ControlPannel";
import { COURT_ZOOM, LAT_ZOOM_INFOWINDOW } from "@/constants/VisglMapConstant";


export const ClusteredCourtsMarkers = ({ map, courts }) => {
    const [markers, setMarkers] = useState({});
    const [selectedCourtKey, setSelectedCourtKey] = useState(null);

    const selectedCourt = useMemo(
        () =>
            courts && selectedCourtKey
                ? courts.find(t => t.key === selectedCourtKey) || null
                : null,
        [courts, selectedCourtKey]
    );

    const clusterer = useMemo(() => {
        if (!map) return null;
        return new MarkerClusterer({ map });
    }, [map]);

    useEffect(() => {
        if (!clusterer) return;
        clusterer.addMarkers(Object.values(markers));
        return () => clusterer.clearMarkers();
    }, [clusterer, markers]);


    // this callback will effectively get passsed as ref to the markers to keep
    // tracks of markers currently on the map
    const setMarkerRef = useCallback((marker, key) => {
        setMarkers(markers => {
            if ((marker && markers[key]) || (!marker && !markers[key]))
                return markers;

            if (marker) {
                return { ...markers, [key]: marker };
            } else {
                const { [key]: _, ...newMarkers } = markers;
                return newMarkers;
            }
        });
    }, []);

    const handleInfoWindowClose = useCallback(() => {
        setSelectedCourtKey(null);
    }, []);

    const handleMarkerClick = useCallback((court) => {
        setSelectedCourtKey(court.key);
    }, []);

    const handleZoomCourt = (selectedCourt) => {
        const coordinates = {
            // Cộng LAT_ZOOM_INFOWINDOW để zoom vào infowindow thay vì marker, nếu không cộng thì sẽ zoom vào marker và infowindow sẽ bị che mất
            lat: selectedCourt?.geolocation?.latitude + LAT_ZOOM_INFOWINDOW,
            lng: selectedCourt?.geolocation?.longitude
        };
        map.setCenter(coordinates);
        map.setZoom(COURT_ZOOM);
    };

    return (
        <>
            {courts.map(court => {
                return (
                    <CourtMarker
                        key={court?.key || court?.id}
                        court={court}
                        onClick={handleMarkerClick}
                        setMarkerRef={setMarkerRef}
                    />
                );
            })}
            <VisglInfoWindow
                selectedCourtKey={selectedCourtKey}
                markers={markers}
                handleInfoWindowClose={handleInfoWindowClose}
                selectedCourt={selectedCourt}
                handleZoomCourt={handleZoomCourt}
            />
            {/* <MarkerControlPanel
                categories={categories}
                onCategoryChange={setSelectedCategory}
                setSelectedCourtKey={setSelectedCourtKey}
            /> */}
        </>
    );
};
