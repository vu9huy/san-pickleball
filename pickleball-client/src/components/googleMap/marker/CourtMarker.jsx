import React, { useCallback } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import Image from "next/image";

export const CourtMarker = (props) => {
    const { court, onClick, setMarkerRef } = props;

    const position = {
        lat: court?.geolocation?.latitude,
        lng: court?.geolocation?.longitude
    };

    const handleClick = useCallback(() => onClick(court), [onClick, court]);
    const ref = useCallback(
        (marker) =>
            setMarkerRef(marker, court.key),
        [setMarkerRef, court.key]
    );


    return (
        <AdvancedMarker position={position} ref={ref} onClick={handleClick}>
            {/* <img src="/images/logo-fit-96x96.png" alt="court marker" width={45} height={45} /> */}
            <Image src="/images/logo-fit-96x96.png" alt="court marker" width={45} height={45} />
        </AdvancedMarker>
    );
};
