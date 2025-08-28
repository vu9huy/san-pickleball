import { Marker } from "react-map-gl";
import PopupMapBox from "../popup/PopupMapBox";
import Image from "next/image";

const MarkerMapBox = ({ court, selectedCourt, handleClosePopup, handleMarkerClick }) => {

    return (
        <>
            <Marker
                latitude={court.latitude}
                longitude={court.longitude}
                onClick={() => handleMarkerClick(court)}
                anchor="bottom"
            >
                {/* <img src="/images/logo-fit-96x96.png" alt="marker" width={40} height={40} /> */}
                <Image src="/images/logo-fit-96x96.png" alt="marker" width={40} height={40} />
            </Marker>
            <PopupMapBox handleClosePopup={handleClosePopup} selectedCourt={selectedCourt} />
        </>
    );
};

export default MarkerMapBox;
