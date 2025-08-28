import { IconSprites1 } from "@/components/iconSprites/IconSprites";
import OpenGoogleMap from "@/components/openGoogleMap/OpenGoogleMap";
import styles from "./CourtAddress.module.css";
import generateMapUrl from "@/utils/userdata/generateMapUrl";

const CourtAddress = ({ address, district, province, lat, lng }) => {

    const mapUrl = generateMapUrl(lat, lng);

    return (
        <div className={styles["court-address-container"]}>
            <p className={styles["court-detail-body-info-block-label"]}>
                <IconSprites1 id="sprites-icon-location" width="20px" height="20px" fill="#99de47" />
                <span>&nbsp;Địa chỉ</span>
                <span>:</span>
            </p>
            <div className={styles["court-detail-body-info-block-content"]}>
                <p>{address}, {district}, {province}</p>
                <p className={styles["court-detail-body-info-block-open-map"]}><OpenGoogleMap lat={lat} lng={lng} /></p>
                {/* <div className={styles["court-detail-body-info-open-map"]}>
                    <iframe className={styles["court-detail-body-info-map-embed"]} src={mapUrl} width="100%" height="200" style={{ "border": "0px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <p className={styles["court-detail-body-info-block-open-map"]}><OpenGoogleMap lat={lat} lng={lng} /></p> */}
                <div className={styles["court-detail-body-info-map-wapper"]}>
                    <div className={styles["court-detail-body-info-map-embeded"]}>
                        <iframe className={styles["court-detail-body-info-map-embed"]} src={mapUrl} width="100%" height="250" style={{ "border": "0px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className={styles["court-detail-body-info-open-map"]}>
                        <OpenGoogleMap lat={lat} lng={lng} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourtAddress;