"use client";

import React, { useEffect, useState, useRef } from "react";
// import { useValue } from '../../context/ContextProvider';
// import { getRooms } from '../../actions/room';
import ReactMapGL, { Marker } from "react-map-gl";
import Supercluster from "supercluster";
import "./cluster.css";

const supercluster = new Supercluster({
    radius: 75,
    maxZoom: 20
});

const MapBoxCluster = () => {
    // const {
    //     state: { rooms },
    //     dispatch,
    //     mapRef,
    // } = useValue();
    const mapRef = useRef();
    const [points, setPoints] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [bounds, setBounds] = useState([-180, -85, 180, 85]);
    const [zoom, setZoom] = useState(15);

    const customMarkerStyle = {
        width: "40px",
        height: "40px"
    };

    useEffect(() => {
        // const points = rooms.map((room) => ({
        //     type: 'Feature',
        //     properties: {
        //         cluster: false,
        //         roomId: room._id,
        //         price: room.price,
        //         title: room.title,
        //         description: room.description,
        //         lng: room.lng,
        //         lat: room.lat,
        //         images: room.images,
        //         uPhoto: room.uPhoto,
        //         uName: room.uName,
        //     },
        //     geometry: {
        //         type: 'Point',
        //         coordinates: [parseFloat(room.lng), parseFloat(room.lat)],
        //     },
        // }));
        const points = [
            {
                type: "Feature",
                properties: {
                    cluster: false,
                    roomId: 5487549854,
                    price: "4343",
                    title: "11",
                    description: "re983498439",
                    lng: 105.1947648,
                    lat: 20.1780736,
                    images: "room.images",
                    uPhoto: "room.uPhoto",
                    uName: "room.uName"
                },
                geometry: {
                    type: "Point",
                    coordinates: [105.1947648, 20.1780736]
                }
            },
            {
                type: "Feature",
                properties: {
                    cluster: false,
                    roomId: 5454542,
                    price: "4343",
                    title: "22",
                    description: "re983498439",
                    lng: 105.5947648,
                    lat: 20.2780736,
                    images: "room.images",
                    uPhoto: "room.uPhoto",
                    uName: "room.uName"
                },
                geometry: {
                    type: "Point",
                    coordinates: [105.5947648, 20.2780736]
                }
            },
            {
                type: "Feature",
                properties: {
                    cluster: false,
                    roomId: 5454542,
                    price: "4343",
                    title: "33",
                    description: "re983498439",
                    lng: 105.3947648,
                    lat: 20.67807366,
                    images: "room.images",
                    uPhoto: "room.uPhoto",
                    uName: "room.uName"
                },
                geometry: {
                    type: "Point",
                    coordinates: [105.3947648, 20.67807366]
                }
            },
            {
                type: "Feature",
                properties: {
                    cluster: false,
                    roomId: 5454542,
                    price: "4343",
                    title: "33",
                    description: "re983498439",
                    lng: 105.6947648,
                    lat: 20.17807366,
                    images: "room.images",
                    uPhoto: "room.uPhoto",
                    uName: "room.uName"
                },
                geometry: {
                    type: "Point",
                    coordinates: [105.6947648, 20.17807366]
                }
            }
        ];
        setPoints(points);
    }, []);

    useEffect(() => {
        supercluster.load(points);
        setClusters(supercluster.getClusters(bounds, zoom));
    }, [points, zoom, bounds]);

    useEffect(() => {
        if (mapRef.current) {
            setBounds(mapRef.current.getMap().getBounds().toArray().flat());
        }
    }, [mapRef?.current]);

    return (
        <ReactMapGL
            initialViewState={{ latitude: 20.17807366, longitude: 105.6947648 }}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
            mapStyle="mapbox://styles/mapbox/streets-v10"
            ref={mapRef}
            style={{ width: 800, height: 600 }}
            onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
        >
            {clusters.map((cluster) => {
                const { cluster: isCluster, point_count } = cluster.properties;
                const [longitude, latitude] = cluster.geometry.coordinates;
                if (isCluster) {
                    return (
                        <Marker
                            key={`cluster-${cluster.id}`}
                            longitude={longitude}
                            latitude={latitude}
                        >
                            <div
                                className="cluster-marker"
                                style={{
                                    width: `${10 + (point_count / points.length) * 20}px`,
                                    height: `${10 + (point_count / points.length) * 20}px`
                                }}
                                onClick={() => {
                                    const zoom = Math.min(
                                        supercluster.getClusterExpansionZoom(cluster.id),
                                        20
                                    );
                                    mapRef.current.flyTo({
                                        center: [longitude, latitude],
                                        zoom,
                                        speed: 1
                                    });
                                }}
                            >
                                {point_count}
                            </div>
                        </Marker>
                    );
                }

                return (
                    <Marker
                        key={`room-${cluster.properties.roomId}`}
                        longitude={longitude}
                        latitude={latitude}
                        anchor="bottom"
                        clickable={true}
                        onClick={() => alert("marker was clicked!")}
                        title={"clickable google.maps.Marker"}
                    >
                        <img src="./images/logo-fit-96x96.png" style={customMarkerStyle} />
                    </Marker>
                );
            })}
        </ReactMapGL>
    );
};

export default MapBoxCluster;