import { IconSprites1, IconSprites2 } from "@/components/iconSprites/IconSprites";
import styles from "./CourtSocial.module.css";
import Link from "next/link";
import checkSocial from "@/utils/others/checkSocial";

const CourtSocial = ({ social }) => {

    return (
        <div className={styles["court-social-container"]}>
            <div className={styles["court-info-window-social"]}>
                <p className={styles["court-detail-body-info-block-label"]}>
                    <IconSprites2 id="sprites-icon-chat" width="20px" height="20px" stroke="#99de47" fill="#99de47" />
                    <span>&nbsp;Liên hệ: {!checkSocial(social) ? "Chưa có thông tin liên hệ" : ""}</span>
                </p>
                <ul className={styles["court-detail-body-info-block-content"]}>
                    {social?.facebook ?
                        <li>
                            <Link target="_blank" rel="nofollow" href={social?.facebook}>
                                <IconSprites1 id="sprites-icon-facebook" width="25px" height="25px" fill="#1877F2" />Facebook
                            </Link>
                        </li> : ""}

                    {social?.zalo ?
                        <li>
                            <Link target="_blank" rel="nofollow" href={social?.zalo}>
                                <IconSprites2 id="sprites-icon-zalo" viewBox="0 0 50 50" width="25px" height="25px" />Zalo
                            </Link>
                        </li>
                        : ""}

                    {social?.phone ?
                        <li className={styles["phone-link"]}>
                            <Link href={`tel:${social?.phone}`}>
                                <span className={styles["court-social-phone-icon"]}><IconSprites2 id="sprites-icon-phone" width="22px" height="22px" fill="#ffffff" /></span>{social.phone}
                            </Link>
                        </li>
                        : ""}
                </ul>
            </div>
        </div>
    );
};

export default CourtSocial;