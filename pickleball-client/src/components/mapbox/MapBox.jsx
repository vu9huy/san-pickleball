"use client";
import React, { useState } from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MarkerMapBox from "./marker/MarkerMapBox";
import "./MapBox.css";

const courtList = [
    {
        id: 1,
        latitude: 20.9780736,
        longitude: 105.7947648,
        title: "Sân 1",
        description: "Description for Point 1",
        owner: "Quân Vũ",
        images: [{
            url: "images/san-pickleball.webp",
            alt: "sân picklball 1"
        },
        {
            url: "images/san-pickleball.webp",
            alt: "sân picklball 2"
        }]
    },
    {
        id: 2,
        latitude: 20.9780736,
        longitude: 105.7547648,
        title: "Sân 2",
        description: "Description for Point 2",
        owner: "Quân Vũ",
        images: [{
            url: "images/san-pickleball.webp",
            alt: "sân picklball 1"
        },
        {
            url: "images/san-pickleball.webp",
            alt: "sân picklball 2"
        }]
    },
    {
        id: 3,
        latitude: 20.9480736,
        longitude: 105.7247648,
        title: "Sân 3",
        description: "Description for Point 3",
        owner: "Quân Vũ",
        images: [{
            url: "images/san-pickleball.webp",
            alt: "sân picklball 1"
        },
        {
            url: "images/san-pickleball.webp",
            alt: "sân picklball 2"
        }]
    }
];

const MAPBOX_DEFAULT_ZOOM = 12.5;

const MapboxMap = ({ district, provinces }) => {
    const [viewState, setViewState] = useState({
        longitude: 105.757403,
        latitude: 20.956594,
        zoom: MAPBOX_DEFAULT_ZOOM
    });

    const [selectedCourt, setSelectedCourt] = useState(null);

    const handleMarkerClick = (point) => {
        setSelectedCourt(point);
    };

    const handleClosePopup = () => {
        setSelectedCourt(null);
    };

    return (
        <div className="map-box-container">
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                initialViewState={viewState}
                cooperativeGestures={true}
                style={{ width: "fit", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                locale={{
                    "ScrollZoomBlocker.CtrlMessage": "Giữ ctrl và cuộn chuột để phóng to, thu nhỏ",
                    "ScrollZoomBlocker.CmdMessage": "Giữ ⌘ và cuộn chuột để phóng to, thu nhỏ"
                }}
            >
                {courtList.map((court) => (
                    <MarkerMapBox key={court.id} court={court} selectedCourt={selectedCourt} handleMarkerClick={handleMarkerClick} handleClosePopup={handleClosePopup} />
                ))}

            </Map>
        </div>
    );
};

export default MapboxMap;
