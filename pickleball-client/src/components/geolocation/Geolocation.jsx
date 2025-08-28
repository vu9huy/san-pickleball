"use client";
import { useEffect } from "react";

const options = {
    enableHighAccuracy: true
    // timeout: 5000,
    // maximumAge: 0,
};

export default function Geolocation({ geolocation, setGeolocation }) {

    useEffect(() => {
        checkLocation();
    }, []);

    const checkLocation = async () => {
        if (navigator.permissions) {
            const result = await navigator.permissions.query({ name: "geolocation" });
            if (result.state === "granted") {
                setHasPermission(true);
                getLocation();
            } else if (result.state === "prompt") {
                getLocation();
            }
        } else {
            getLocation();
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            setStatus("Geolocation is not supported by this browser.");
        }
    };

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("position", position);
        setGeolocation({ latitude, longitude });
    };

    const error = (err) => {
        switch (err.code) {
        case err.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case err.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case err.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        default:
            console.log("An unknown error occurred.");
            break;
        }
    };

    return (
        <div>
            <h1>Location Access Example</h1>
            {geolocation.latitude && (
                <p>
                    Latitude: {geolocation.latitude}, Longitude: {geolocation.longitude}
                </p>
            )}
        </div>
    );
}
