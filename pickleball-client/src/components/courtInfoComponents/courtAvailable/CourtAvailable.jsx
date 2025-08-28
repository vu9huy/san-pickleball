import { IconSprites1 } from "@/components/iconSprites/IconSprites";
import styles from "./CourtAvailable.module.css";
import convertTimeObject from "@/utils/time/convertTimeObject";
import checkAvailable from "@/utils/time/checkAvailable";

const CourtAvailable = ({ availability }) => {

    return (
        <div className={styles["court-available-container"]}>
            <div className={styles["court-info-window-available-time"]}>
                <p className={styles["court-detail-body-info-block-label"]}>
                    <IconSprites1 id="sprites-icon-time" width="20px" height="20px" stroke="#99de47" fill="#99de47" />
                    <span>&nbsp;Thời gian mở cửa: &nbsp;</span>
                    <span>{checkAvailable(availability)}</span>
                </p>
                <ul className={styles["court-detail-body-info-block-content"]}>
                    {availability.map((availability, index) => {
                        const openTime = convertTimeObject(availability?.openTime);
                        const closeTime = convertTimeObject(availability?.closeTime);
                        return (<li key={index}>
                            {availability.label}: <span className={styles["court-info-window-available-time-detail"]}>{openTime} - {closeTime}</span>
                        </li>);
                    })}
                </ul>
            </div>
        </div>
    );
};

export default CourtAvailable;