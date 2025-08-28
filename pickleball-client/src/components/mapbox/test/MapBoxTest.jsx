"use client";

import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const samplePoints = [
    { id: 1, latitude: 37.78, longitude: -122.41, title: "Point 1", description: "Description for Point 1" },
    { id: 2, latitude: 37.79, longitude: -122.42, title: "Point 2", description: "Description for Point 2" },
    { id: 3, latitude: 37.76, longitude: -122.45, title: "Point 3", description: "Description for Point 3" }
];

const MapBoxTest = () => {
    const [viewport, setViewport] = useState({
        longitude: 105.7947648,
        latitude: 20.9780736,
        zoom: 15
    });

    const [selectedPoint, setSelectedPoint] = useState(null);

    const handleMarkerClick = (point) => {
        setSelectedPoint(point);
    };

    const handleClosePopup = () => {
        setSelectedPoint(null);
    };

    const customMarkerStyle = {
        width: "40px",
        height: "40px"
    };

    return (
        <ReactMapGL
            // {...viewport}
            // mapStyle="mapbox://styles/mapbox/streets-v11"
            // mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
            // onViewportChange={(newViewport) => setViewport(newViewport)}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
            initialViewState={{
                longitude: 105.7947648,
                latitude: 20.9780736,
                zoom: 15
            }}
            cooperativeGestures={true}
            style={{ width: 1000, height: 600 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
        >
            {samplePoints.map((point) => (
                <Marker
                    key={point.id}
                    latitude={point.latitude}
                    longitude={point.longitude}
                    onClick={() => handleMarkerClick(point)}
                >
                    {/* <CustomMarker
                        point={point}
                        onClick={() => handleMarkerClick(point)}
                    /> */}
                    <img src="./images/logo-fit-96x96.png" style={customMarkerStyle} />
                </Marker>
            ))}

            {selectedPoint && (
                <Popup
                    latitude={selectedPoint.latitude}
                    longitude={selectedPoint.longitude}
                    onClose={handleClosePopup}
                    closeOnClick={false}
                >
                    <div>
                        <h2>{selectedPoint.title}</h2>
                        <p>{selectedPoint.description}</p>
                    </div>
                </Popup>
            )}
        </ReactMapGL>
    );
};

export default MapBoxTest;
