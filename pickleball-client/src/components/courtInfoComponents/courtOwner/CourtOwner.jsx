import Link from "next/link";
import styles from "./CourtOwner.module.css";
import { IconSprites1 } from "@/components/iconSprites/IconSprites";

const CourtOwner = ({ owner }) => {
    return (
        <div className={styles["court-owner-container"]}>
            {/* <p className={styles["court-detail-body-info-block-label"]}>
                <IconSprites1 id="sprites-icon-user" width="20px" height="20px" stroke="#99de47" fill="#99de47" />
                <span>&nbsp;Chủ sân:&nbsp;</span>
                <Link href={`/nguoi-dung/${owner?.id}`} className="link">{owner?.name}</Link>
            </p> */}
            <ul className={styles["court-detail-body-info-block-content"]}>
                {owner?.facebook ? <p>Facebook: <Link href={owner?.facebook} target="_blank" rel="nofollow" className="link">{owner?.facebook}</Link></p> : ""}
                {owner?.zalo ? <p>Zalo: <Link href={owner?.zalo} target="_blank" rel="nofollow" className="link">{owner?.zalo}</Link></p> : ""}
            </ul>
        </div>
    );
};

export default CourtOwner;