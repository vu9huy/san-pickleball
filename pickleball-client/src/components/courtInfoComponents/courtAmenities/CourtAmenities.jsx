import { IconSprites1 } from "@/components/iconSprites/IconSprites";
import styles from "./CourtAmenities.module.css";
import { amenitiesLabels } from "@/helpers/courtFeatures";

const CourtAmenities = ({ amenities }) => {
    return (
        <div className={styles["court-amenities-container"]}>
            <p className={styles["court-detail-body-info-block-label"]}>
                <IconSprites1 id="sprites-icon-amenities" width="20px" stroke="#99de47" fill="#99de47" viewBox="0 0 100 100" />
                <span>&nbsp;Tiện ích:</span>
                <span className={styles["court-surface-value"]}>&nbsp;</span>
            </p>
            <ul className={`${styles["court-detail-body-info-block-content"]} ${styles["checkbox-wrapper"]} checkbox`}>
                {Object.entries(amenities)
                    .filter(([key, value]) => value)
                    .map(([key, value]) => (
                        <label key={key} >
                            <input type="checkbox" checked={value} readOnly />
                            <span>{amenitiesLabels[key]}</span>
                        </label>
                    ))}
            </ul>
        </div>
    );
};

export default CourtAmenities;