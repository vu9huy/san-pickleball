
import { Popup } from "react-map-gl";
import "./PopupMapBox.css";
import CourtInfoWindow from "@/components/courtInfoWindow/CourtInfoWindow";

const PopupMapBox = ({ handleClosePopup, selectedCourt }) => {

    return (
        <>
            {selectedCourt ? (
                <Popup
                    latitude={selectedCourt.latitude}
                    longitude={selectedCourt.longitude}
                    // onClose={handleClosePopup}
                    closeOnClick={false}
                    closeButton={false}
                    focusAfterOpen={false}
                    anchor="bottom"
                    offset={[0, -45]}
                >
                    <div className="map-box-infowindow">
                        <button className="map-box-infowindow-close-button" onClick={handleClosePopup}>
                            <p>+</p>
                        </button>
                        <CourtInfoWindow court={selectedCourt} />
                    </div>
                </Popup>
            ) : ""}
        </>
    );
};

export default PopupMapBox;


