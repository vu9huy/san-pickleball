import { IconSprites1 } from "@/components/iconSprites/IconSprites";
import styles from "./CourtFeature.module.css";
import { featureLabels } from "@/helpers/courtFeatures";

const CourtFeature = ({ features }) => {

    return (
        <div className={styles["court-feature-container"]}>
            <p className={styles["court-detail-body-info-block-label"]}>
                <span className={styles["court-icon-wrap"]}>
                    <IconSprites1 viewBox="-5.0 -10.0 110 110" fill="#99de47" id="sprites-icon-court" />
                </span>
                <span>Loại sân:</span>
                <span className={styles["court-surface-value"]}>&nbsp;</span>
            </p>
            <ul className={`${styles["court-detail-body-info-block-content"]} ${styles["checkbox-wrapper"]} checkbox`}>
                {Object.entries(features)
                    // .filter(([key, value]) => value)
                    .map(([key, value]) => (
                        <label key={key} >
                            <input type="checkbox" checked={value} readOnly />
                            <span>{featureLabels[key]}</span>
                        </label>
                    ))}
            </ul>
        </div>
    );
};

export default CourtFeature;