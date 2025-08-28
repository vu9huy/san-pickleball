import { IconSprites1 } from "@/components/iconSprites/IconSprites";
import styles from "./CourtUtilities.module.css";


const CourtUtilities = ({ utilities }) => {

    return (
        <div className={styles["court-utinities-container"]}>
            <p className={styles["court-detail-body-info-block-label"]}>
                <IconSprites1 id="sprites-icon-list" width="20px" height="20px" stroke="#99de47" fill="transparent" />
                <span>&nbsp;Dịch vụ khác:</span>
            </p>
            <ul className={styles["court-detail-body-info-block-content"]}>
                {utilities?.map((util, index) => <li key={index}>{util.name}: {util.description}</li>)}
            </ul>
        </div>
    );
};

export default CourtUtilities;