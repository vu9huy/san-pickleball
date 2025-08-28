import { IconSprites1 } from "@/components/iconSprites/IconSprites";
import styles from "./CourtSurface.module.css";

const CourtSurface = ({ surface }) => {
    return (
        <div className={styles["court-surface-container"]}>
            <p className={styles["court-detail-body-info-block-label"]}>
                <IconSprites1 id="sprites-icon-surface" width="20px" stroke="#99de47" fill="#99de47" viewBox="0 0 100 125" />
                <span>&nbsp;Mặt sân:</span>
                <span className={styles["court-surface-value"]}>&nbsp;{surface}</span>
            </p>
        </div>
    );
};

export default CourtSurface;