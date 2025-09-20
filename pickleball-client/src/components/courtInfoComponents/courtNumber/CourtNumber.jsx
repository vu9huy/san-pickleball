import { IconSprites1 } from "@/components/iconSprites/IconSprites";
import styles from "./CourtNumber.module.css";

const CourtNumber = ({ number, type = "court" }) => {
    const checkCourt = type === "court";

    return (
        <div className={styles["court-number-container"]}>
            <span className={styles["court-detail-body-info-block-label"]}>
                {checkCourt ?
                    <span className={styles["court-detail-body-info-block-fake-icon"]}>#</span>
                    :
                    <IconSprites1 id="sprites-icon-location" width="28px" height="28px" fill="#99de47" />}
                <span>&nbsp;Tìm thấy: </span>
                <span><span className={styles["court-detail-body-info-block-content"]}> &nbsp;{number}&nbsp;</span></span>
                <span>{checkCourt ? "sân" : "địa điểm"}</span>
            </span>
        </div>
    );
};

export default CourtNumber;